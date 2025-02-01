"use client";

import { cn } from "@/libs/utils";
import { useState } from "react";
import { AiFillCheckCircle, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function DashboardBox({ children, className }) {
  return (
    <div
      className={cn(
        "h-full w-full bg-white p-[7px] md:rounded-lg md:p-[15px] lg:rounded-2xl lg:p-[20px] 2xl:p-[25px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DashboardTitle({ className, title }) {
  return (
    <div
      className={cn(
        "relative mt-[20px] flex w-full flex-col font-dmSans font-[700] text-darkpurple",
        className,
      )}
    >
      <h2 className="md:text-[23px] xl:text-[27px]">{title}</h2>
    </div>
  );
}

export function DashboardHeading({ className, title }) {
  return (
    <div
      className={cn(
        "relative mt-[20px] flex w-full flex-col font-dmSans font-[700] text-darkpurple",
        className,
      )}
    >
      <h2 className="md:text-[20px] xl:text-[24px]">{title}</h2>
    </div>
  );
}

export function DashboardSectionTitle({ className, title }) {
  return (
    <div
      className={cn(
        "relative mt-[20px] flex w-full flex-col font-dmSans font-[500] text-darkpurple",
        className,
      )}
    >
      <h2 className="md:text-[16px] xl:text-[20px]">{title}</h2>
    </div>
  );
}

export function DashboardData({ className, title, isi, hidden = false, verified = false }) {
  const [showHidden, setShowHidden] = useState(!hidden);
  const handleShowHidden = () => {
    if (!hidden) return;
    setShowHidden(!showHidden);
  };
  let hiddenIsi = "*".repeat(isi.length);
  return (
    <div className={cn("relative mt-[18px] flex w-full flex-col font-dmSans", className)}>
      <h3 className="font-[700] text-lightpurple md:text-[13px] xl:text-[17px]">{title}</h3>
      <div
        className={cn(
          "relative flex w-fit max-w-full flex-row gap-[10px] text-wrap break-all font-dmSansRegular text-black md:text-[14px] xl:text-[18px]",
        )}
      >
        {showHidden ? isi : hiddenIsi}
        {hidden && !verified && (
          <button
            type="button"
            onClick={handleShowHidden}
            className="aspect-[1/1] w-[25px] text-lightpurple hover:text-purple"
          >
            {showHidden ? (
              <AiFillEye className="h-full w-full" />
            ) : (
              <AiFillEyeInvisible className="h-full w-full" />
            )}
          </button>
        )}
        {verified && !hidden && (
          <div className="aspect-[1/1] w-[20px] text-[#05CD99] text-lightpurple hover:text-purple">
            <AiFillCheckCircle className="h-full w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardDataInput({ className, title, isi, placeholder, hidden = false }) {
  return (
    <div className={cn("relative mt-[18px] flex w-full flex-col font-dmSans", className)}>
      <h3 className="font-[700] text-lightpurple md:text-[13px] xl:text-[17px]">{title}</h3>
      <input
        type={hidden && "password"}
        className={cn(
          "relative flex w-fit max-w-full flex-row gap-[10px] text-wrap break-all font-dmSansRegular text-black md:text-[14px] xl:text-[18px]",
        )}
      />
    </div>
  );
}
