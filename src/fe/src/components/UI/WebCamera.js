"use client";

import useWindowSize from "@/hooks/useWindowSize";
import { cn } from "@/libs/utils";
import React, { useRef } from "react";
import Webcam from "react-webcam";

export default function WebCamera({ className }) {
  const webcamRef = useRef(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  return (
    <div className={cn("relative h-[500px] w-[500px]", className)}>
      <Webcam className="h-full w-full" audio ref={webcamRef} />
    </div>
  );
}
