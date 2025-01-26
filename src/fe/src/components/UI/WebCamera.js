"use client";

import { cn } from "@/libs/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";

export default function WebCamera({ className }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [socketio, setSocketio] = useState(null);

  useEffect(() => {
    // Initialize the Socket.io client
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    setSocketio(socket);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error(`Socket connection error: ${err.message}`);
    });

    // Cleanup on component unmount
    return () => {
      if (socket) {
        console.log("Disconnecting socket...");
        socket.disconnect();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      setCapturing(true);

      const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0 && socketio) {
          console.log("Sending video chunk...");
          socketio.emit("stream", event.data);
        }
      });

      mediaRecorder.start(100); // Pass `100` to create a chunk every 100ms
    }
  }, [socketio]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
    if (socketio) {
      console.log("Emitting download event...");
      socketio.emit("download");
    }
  }, [socketio]);

  return (
    <div className={cn("relative h-[500px] w-[500px]", className)}>
      <Webcam className="h-full w-full" audio ref={webcamRef} />
      <button
        type="button"
        className={cn("h-[100px] w-[200px]", capturing ? "bg-red-500" : "bg-green-500")}
        onClick={handleStartCaptureClick}
        disabled={capturing}
      >
        Start
      </button>
      <button
        type="button"
        className={cn("h-[100px] w-[200px]", !capturing ? "bg-red-500" : "bg-green-500")}
        onClick={handleStopCaptureClick}
        disabled={!capturing}
      >
        Stop
      </button>
    </div>
  );
}
