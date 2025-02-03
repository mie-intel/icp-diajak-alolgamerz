"use client";

import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";
import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const RTCConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun.l.google.com:5349" },
    { urls: "stun:stun1.l.google.com:3478" },
    { urls: "stun:stun1.l.google.com:5349" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:5349" },
    { urls: "stun:stun3.l.google.com:3478" },
    { urls: "stun:stun3.l.google.com:5349" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:5349" },
  ],
};

function VideoPlayer({ stream }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return <video ref={ref} autoPlay playsInline controls={false}></video>;
}

export default function Meet({ roomId }) {
  const webcamRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [username, setUsername] = useState("");
  const [videoStreams, setVideoStreams] = useState({}); // { socketId1: stream }
  const peers = useRef({}); // { socketId1: { username, pc, pendingCandidates } }

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      setCapturing(true);
    } else {
      setTimeout(handleStartCaptureClick, 1000);
    }
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter username") || "User");

    const interval = setTimeout(() => {
      handleStartCaptureClick();
    }, 1000);

    const newSocket = io("https://051plp7w-3001.asse.devtunnels.ms/", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log(`Socket connected ${newSocket.id}`);
    });

    newSocket.on("connect_error", () => {
      console.log(`Failed to connect to socket`);
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
      setSocket(null);
      console.log(`Socket disconnected`);
    };
  }, []);

  useEffect(() => {
    if (!socket || !username || !capturing) return;

    function createPeerConnection(peerId) {
      const pc = new RTCPeerConnection(RTCConfig);

      pc.ontrack = (event) => {
        if (!videoStreams[peerId]) {
          setVideoStreams((prev) => ({ ...prev, [peerId]: new MediaStream() }));
        }

        event.streams[0].getTracks().forEach((track) => {
          videoStreams[peerId].addTrack(track);
        });
      };

      pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
          socket.emit("signal", {
            target: peerId,
            signal: { candidate },
          });
        }
      };

      return pc;
    }

    // Updated peer connection handling
    async function addClient(client) {
      const ourId = socket.id;
      const peerId = client.socketId;
      
      // Only create offer if we're the "lower" ID
      const isInitiator = ourId < peerId;
    
      const pc = new RTCPeerConnection(RTCConfig);
      peers.current[peerId] = { 
        pc,
        isInitiator,
        pendingCandidates: [],
        isNegotiating: false
      };
    
      // Add local tracks
      webcamRef.current.stream.getTracks().forEach(track => {
        pc.addTrack(track, webcamRef.current.stream);
      });
    
      pc.ontrack = (event) => {
        setVideoStreams(prev => ({
          ...prev,
          [peerId]: event.streams[0]
        }));
      };
    
      pc.onicecandidate = ({ candidate }) => {
        candidate && socket.emit("signal", {
          target: peerId,
          signal: { candidate }
        });
      };

      pc.onsignalingstatechange = () => {
        console.log(`Signaling state for ${peerId}:`, pc.signalingState);
      };
      
      pc.oniceconnectionstatechange = () => {
        console.log(`ICE state for ${peerId}:`, pc.iceConnectionState);
      };
    
      pc.onnegotiationneeded = async () => {
        const peer = peers.current[peerId];
        if (!peer.isInitiator || peer.isNegotiating) return;
        
        try {
          peer.isNegotiating = true;
          const offer = await pc.createOffer({ iceRestart: true });
          await pc.setLocalDescription(offer);
          socket.emit("signal", {
            target: peerId,
            signal: { offer }
          });
        } catch (err) {
          // console.error("Renegotiation error:", err);
        } finally {
          peer.isNegotiating = false;
        }
      };
      
    
      // Only create offer if initiator
      if (isInitiator) {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit("signal", {
            target: peerId,
            signal: { offer }
          });
        } catch (err) {
          console.error("Initial offer error:", err);
        }
      }
    }

    // Updated signal handler
    async function handleSignal(peerId, signal) {
      const peer = peers.current[peerId];
      if (!peer) return;
    
      try {
        if (signal.offer) {
          // Only process offers if we're NOT the initiator
          if (peer.isInitiator) {
            console.warn("Received offer but we're initiator - ignoring");
            return;
          }
    
          await peer.pc.setRemoteDescription(new RTCSessionDescription(signal.offer));
          
          const answer = await peer.pc.createAnswer();
          await peer.pc.setLocalDescription(answer);
          
          socket.emit("signal", {
            target: peerId,
            signal: { answer }
          });
    
          // Process queued candidates
          peer.pendingCandidates.forEach(c => 
            peer.pc.addIceCandidate(c).catch(console.error)
          );
          peer.pendingCandidates = [];
    
        } else if (signal.answer) {
          // Only process answers if we ARE the initiator
          if (!peer.isInitiator) {
            console.warn("Received answer but we're not initiator - ignoring");
            return;
          }
    
          await peer.pc.setRemoteDescription(new RTCSessionDescription(signal.answer));
    
        } else if (signal.candidate) {
          const candidate = new RTCIceCandidate(signal.candidate);
          if (peer.pc.remoteDescription) {
            await peer.pc.addIceCandidate(candidate);
          } else {
            peer.pendingCandidates.push(candidate);
          }
        }
      } catch (err) {
        console.error("Signal handling error:", err);
      }
    }

    socket.emit("join", { roomId, username }, (clients) => {
      clients.forEach((client) => {
        console.log("Existing member: ", client);
        addClient(client);
      });
    });

    socket.on("newPeer", async (client) => {
      console.log("New member: ", client);
      addClient(client);
    });

    socket.on("removePeer", (peerId) => {
      const peer = peers.current[peerId];
      if (peer) {
        peer.pc.close();
        delete peers.current[peerId];
        setVideoStreams(prev => {
          const newStreams = {...prev};
          delete newStreams[peerId];
          return newStreams;
        });
      }
    });

    socket.on("signal", ({ sender, signal }) => {
      console.log("Received signal", signal, "from", sender);
      handleSignal(sender, signal);
    });
  }, [socket, username, capturing]);
  false
  return (
    <DashboardBox>
      <div className="w-full h-full">
        <div className="grid grid-flow-row grid-cols-3">
          <Webcam ref={webcamRef} audio={true} muted videoConstraints={videoConstraints} />
          {Object.keys(videoStreams).map((socketId) => (
            <VideoPlayer key={socketId} stream={videoStreams[socketId]} />
          ))}
        </div>
      </div>
    </DashboardBox>
  );
}