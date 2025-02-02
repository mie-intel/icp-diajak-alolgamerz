"use client";

import { cn } from "@/libs/utils";
import { useState, useEffect } from "react";
import { AiFillCheckCircle, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function DashboardBox({ className = "", children = null }) {
  return (
    <div
      className={cn(
        "h-[90dvh] w-full bg-white p-[7px] md:rounded-lg md:p-[15px] lg:h-full lg:rounded-2xl lg:p-[20px] 2xl:p-[25px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DashboardSuperTitle({ className = "", title = "" }) {
  return (
    <h2
      className={cn(
        "relative mt-[20px] flex w-full flex-col text-left font-dmSans text-[20px] font-normal text-black md:mb-[7px] md:text-[30px] lg:mb-[20px] lg:text-left lg:text-[34px] 2xl:text-[37px]",
        className,
      )}
    >
      {title}
    </h2>
  );
}

export function DashboardTitle({ className = "", title = "" }) {
  return (
    <h2
      className={cn(
        "relative mt-[20px] flex w-full flex-col font-dmSans text-[16px] font-[700] text-darkpurple md:text-[23px] xl:text-[27px]",
        className,
      )}
    >
      {title}
    </h2>
  );
}

export function DashboardHeading({ className = "", title = "" }) {
  return (
    <h2
      className={cn(
        "relative mt-[20px] flex w-full flex-col font-dmSans text-[16px] font-[700] text-darkpurple md:text-[20px] xl:text-[24px]",
        className,
      )}
    >
      {title}
    </h2>
  );
}

export function DashboardSectionTitle({ className = "", title = "" }) {
  return (
    <h3
      className={cn(
        "relative mt-[20px] flex w-full flex-col font-dmSans text-[15px] font-[500] text-darkpurple md:text-[16px] xl:text-[20px]",
        className,
      )}
    >
      {title}
    </h3>
  );
}

export function DashboardData({
  className = "",
  title = "",
  isi = "",
  hidden = false,
  verified = false,
  bold = false,
  date,
}) {
  const [showHidden, setShowHidden] = useState(!hidden);
  const handleShowHidden = () => {
    if (!hidden) return;
    setShowHidden(!showHidden);
  };
  let hiddenIsi = "*".repeat(isi.length);
  return (
    <div
      className={cn("relative mt-[11px] flex w-full flex-col font-dmSans md:mt-[18px]", className)}
    >
      <h3 className="text-[12px] font-[700] text-lightpurple md:text-[13px] xl:text-[17px]">
        {title}
      </h3>
      <div
        className={cn(
          "relative flex w-fit max-w-full flex-row gap-[10px] text-wrap break-all font-dmSansRegular text-[10px] text-black md:text-[14px] xl:text-[18px]",
          bold && "font-[700] text-darkpurple",
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
          <div className="aspect-[1/1] w-[20px] text-lightpurple hover:text-purple">
            <AiFillCheckCircle className="h-full w-full text-[#05CD99]" />
          </div>
        )}
        {date && (
          <p className="self-center text-[8px] text-[#05CD99] text-lightpurple hover:text-purple md:text-[11px] xl:text-[14px]">
            *DD/MM/YYY
          </p>
        )}
      </div>
    </div>
  );
}

export function LineHorizontal({ className }) {
  return <div className={cn("mt-[20px] h-[0.5px] w-full bg-lightpurple", className)} />;
}

export function LineVertical({ className }) {
  return <div className={cn("mx-[5px] h-[100px] w-[0.5px] bg-lightpurple", className)} />;
}
