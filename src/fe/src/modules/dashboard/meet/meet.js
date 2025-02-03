"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { cn } from "@/libs/utils";
import { io } from "socket.io-client";
import { Button1 } from "@/components/UI/Button"
import { MdOutlineMicNone, MdOutlineMicOff, MdOutlineVideocam, MdOutlineVideocamOff, MdCallEnd } from "react-icons/md";
import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";

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
  return <video className="h-full" ref={ref} autoPlay playsInline controls={false}></video>;
}

function VideoContainer({ username, children }){
  return(
    <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
      {children}
    </div>
  )
}

export default function Meet({ roomId, username, exitRoom }) {
  const webcamRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [videoStreams, setVideoStreams] = useState({}); // { socketId1: stream }
  const peers = useRef({}); // { socketId1: { username, pc, pendingCandidates } }

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      setCapturing(true);
      setVideoStreams({ ...videoStreams, local: webcamRef.current.stream });
    } else {
      setTimeout(handleStartCaptureClick, 1000);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
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
      exitRoom();
    });

    newSocket.on('disconnect', exitRoom)

    setSocket(newSocket);
    return () => {
      newSocket?.disconnect();
      setSocket(null);
      console.log(`Socket disconnected`);
    };
  }, []);

  useEffect(() => {
    if (!socket || !username || !capturing) return;
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
      
      pc.onconnectionstatechange = () => {
        console.log('Connection state:', pc.connectionState);
        if (pc.connectionState === 'failed') {
          console.log("restarting");
          pc.restartIce();
        }
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

    return () => {
      socket?.disconnect();
      setVideoStreams([]);
      Object.keys(peers.current).forEach(peerId => {
        peers.current[peerId].pc.close();
      })
      peers.current = {};
    }
  }, [socket, username, capturing]);

  function toggleAudio(){
    setAudio(prev => !prev);
    webcamRef.current.stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  }

  function toggleVideo(){
    setVideo(prev => !prev);
    webcamRef.current.stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
  }
  
  return (
      <>
        <div className="grid grid-flow-row md:grid-cols-3 grid-cols-2 h-full gap-6 p-4 rounded-lg">
          <VideoContainer>
            <Webcam ref={webcamRef} audio={audio} muted disablePictureInPicture videoConstraints={videoConstraints} />
          </VideoContainer>
          {Object.keys(videoStreams)
            .filter(socketId => socketId !== 'local')
            .map((socketId) => (
            <VideoContainer key={socketId}>
              <VideoPlayer stream={videoStreams[socketId]} />
            </VideoContainer>
          ))}
        </div>
        
        <DashboardBox className="w-fit h-auto gap-[10px] flex items-center justify-center bg-grey lg:!absolute !fixed  lg:!bottom-4 bottom-24 left-[50%] -translate-x-[50%] !rounded-xl !p-3 md:!p-4">
          <Button1 className={cn(audio ? "bg-darkpurple hover:bg-purple hover:text-darkpurple" : "bg-red-500 text-white hover:text-red-800  hover:bg-red-300", "size-16 flex items-center justify-center text-white outline-0 !mt-0 !text-xl")} onClick={toggleAudio}>{
            audio ? <MdOutlineMicNone className="size-12"/> : <MdOutlineMicOff className="size-12"/>
          }</Button1>
          <Button1 className={cn(video ? "bg-darkpurple hover:bg-purple hover:text-darkpurple" : "bg-red-500 text-white hover:text-red-800  hover:bg-red-300", "size-16 flex items-center justify-center text-white outline-0 !mt-0 !text-xl")} onClick={toggleVideo}>{
            video ? <MdOutlineVideocam className="size-12"/> : <MdOutlineVideocamOff className="size-12"/>
          }</Button1>
          <Button1 className="bg-red-500 text-white hover:text-red-800  hover:bg-red-300 size-16 w-24 !ml-6 !mt-0 !text-xl" onClick={exitRoom}>{
            <MdCallEnd className="size-8" />
          }</Button1>
        </DashboardBox>
      </>
  );
}