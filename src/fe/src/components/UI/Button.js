"use client";

import { cn } from "@/libs/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/UI/dropdown-menu";

export function Button1({ className = "", children = "Submit", outline = false, ...props }) {
  return (
    <button
      type="button"
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
  );
}

export const ButtonDropDown = ({
  className,
  option = [],
  children = "",
  outline = false,
  onSelect, // Callback function to return the selected value
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (item) => {
    setSelectedValue(item); // Update local state (optional)
    onSelect(item); // Pass the selected value back to the parent
  };

  return (
    <div
      className={cn(
        "relative mt-[26px] flex w-full items-center justify-center rounded-2xl p-[13px] text-[10px] font-[700] duration-300 md:mt-[37px] md:p-[18px] md:text-[14px] lg:mt-[44px] xl:text-[18px] 2xl:rounded-3xl",
        outline
          ? "border-[1px] border-darkpurple bg-white text-darkpurple hover:border-white hover:bg-lightpurple hover:text-white md:border-[2px]"
          : "bg-darkpurple text-white hover:bg-lightpurple",
        className,
      )}
      {...props}
    >
      <DropdownMenu className={"h-full w-full"}>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {option.map((item) => {
            return (
              <DropdownMenuItem key={JSON.stringify(item)} onSelect={() => handleSelect(item)}>
                {item}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
