"use client";

import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { cn } from "@/libs/utils";

export function Form({ className = "", ...props }) {
  return <form className={cn("flex w-full flex-col bg-inherit", className)} {...props} />;
}

export function FormInputText({
  className = "",
  title,
  placeholder = "",
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
            {...register}
            type={hidden && !showHidden ? "password" : "text"}
            placeholder={placeholder}
            className="] relative h-full w-full bg-inherit p-[13px] font-dmSansRegular text-[10px] text-black outline-0 max-md:px-[16px] md:p-[18px] md:text-[14px] xl:text-[18px]"
          />
          {isClient && hidden && (
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
        </div>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  );
}

export function FormTextArea({ className = "", title, placeholder = "", error = null, register }) {
  const [isClient, setIsClient] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleShowHidden = () => {
    if (!hidden) return;
    setShowHidden(!showHidden);
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
            {...register}
            type={hidden && !showHidden ? "password" : "text"}
            placeholder={placeholder}
            className="] relative h-full w-full bg-inherit p-[13px] font-dmSansRegular text-[10px] text-black outline-0 max-md:px-[16px] md:p-[18px] md:text-[14px] xl:text-[18px]"
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  );
}
export function FormSubmit({ className = "", children = "Submit", outline = false, ...props }) {
  return (
    <>
      <button
        type="submit"
        className={cn(
          "relative mt-[26px] flex w-full items-center justify-center rounded-2xl p-[13px] text-[10px] font-[700] duration-300 md:mt-[37px] md:p-[18px] md:text-[14px] lg:mt-[44px] xl:text-[18px] 2xl:rounded-3xl",
          outline
            ? "border-[1px] border-darkpurple bg-white text-darkpurple hover:border-white hover:bg-lightpurple hover:text-white md:border-[2px]"
            : "bg-darkpurple text-white hover:bg-lightpurple",
          className,
        )}
        children={children}
        {...props}
      />
    </>
  );
}

export function FormCaption({ className = "", ...props }) {
  return (
    <div
      className={cn(
        "relative mt-[20px] flex w-full items-center rounded-lg text-[10px] text-black md:mt-[27px] md:rounded-xl md:text-[14px] lg:mt-[32px] xl:rounded-2xl xl:text-[18px] 2xl:rounded-3xl",
        className,
      )}
      {...props}
    />
  );
}
