"use client"

import { DashboardBox, DashboardSuperTitle, DashboardTitle } from "@/components/UI/Dashboard/DashboardBody";
import Meet from "./meet";
import { useState, useEffect } from "react";
import { Button1 } from "@/components/UI/Button";
import { cn } from "@/libs/utils";

function FormInputText({
  className = "",
  title = "",
  placeholder = "",
  onchange,
  value,
  hidden = false,
  error = null,
  register,
}) {
  const [isClient, setIsClient] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleShowHidden = () => {
    if (!hidden) return;
    setShowHidden(!showHidden);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div
        className={cn(
          "relative mt-[10px] flex w-full flex-col font-dmSans md:mt-[18px]",
          className,
        )}
      >
        {title && <h3 className="text-[10px] text-black md:text-[13px] xl:text-[17px]">{title}</h3>}
        <div
          className={cn(
            "relative mt-[5px] flex w-full flex-row items-center overflow-clip rounded-2xl bg-grey pr-[7px] md:mt-[8px] md:pr-[13px] lg:mt-[11px] xl:pr-[18px] 2xl:rounded-3xl",
          )}
        >
          <input
            type={hidden && !showHidden ? "password" : "text"}
            placeholder={placeholder}
            value={value}
            onChange={onchange}
            className="relative h-full w-full bg-inherit p-[13px] font-dmSansRegular text-[10px] text-black outline-0 max-md:px-[16px] md:p-[18px] md:text-[14px] xl:text-[18px]"
          />
        </div>
      </div>
    </>
  );
}

export default function MeetingRoom(){
  // unauthorized, ongoing, left, processing, done
  const [meetState, setMeetState] = useState("unauthorized");
  const [username, setUsername] = useState("User");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRoomId(params.get('id') || ""); // More direct access
  }, []);

  if (meetState == "unauthorized") {
    function handleSubmit(event) {
      event.preventDefault();
      if (!username || !roomId) return;

      // Update URL
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('id', roomId);
      window.history.replaceState(
        null, 
        '', 
        `${window.location.pathname}?${searchParams}`
      );

      setMeetState("ongoing");
    }

    return (
      <DashboardBox className="flex flex-col justify-center items-center w-full h-full relative min-h-[88dvh]">
        <DashboardSuperTitle className="w-fit" title="Join Room"/>
        <FormInputText className="w-[30%]" title="Room ID" value={roomId} onchange={(event) => setRoomId(event.target.value)} placeholder="User"/>
        <FormInputText className="w-[30%]" title="Username" value={username} onchange={(event) => setUsername(event.target.value)} placeholder="User"/>
        <Button1 type="submit" className="w-[30%] !m-4" onClick={handleSubmit}>
          Submit
        </Button1>
      </DashboardBox>
    )
  }
  
  else if(meetState == "ongoing"){
    function exitRoom(){
      setMeetState("left");
    }

    return(
      <DashboardBox className="w-full h-full relative min-h-[88dvh]">
        <Meet roomId={roomId} username={username} exitRoom={exitRoom}/>
      </DashboardBox>
    )
  }

  else if(meetState === "left"){
    return(
      <>
      <DashboardBox className="flex flex-col justify-center items-center w-full h-full relative min-h-[88dvh]">
        <DashboardTitle className="w-fit" title="You've just exited the room"/>
        <Button1 type="submit" className="w-[30%] !m-4" onClick={() => window.location.reload()}>
          Rejoin
        </Button1>
      </DashboardBox>
      </>
    )
  }
}