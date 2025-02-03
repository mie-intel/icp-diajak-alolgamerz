import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons";

import { cn } from "@/libs/utils";

export function DropdownMenu({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Root
      className={cn("border-[1px] font-dmSans font-normal text-black", className)}
      {...props}
    />
  );
}
export function DropdownMenuTrigger({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Trigger
      className={cn("h-full w-full font-dmSans font-[600] outline-0 hover:scale-[1.01]", className)}
      {...props}
    />
  );
}

export function DropdownMenuGroup({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Group
      className={cn("font-dmSans font-normal text-inherit", className)}
      {...props}
    />
  );
}

export function DropdownMenuPortal({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal
      className={cn("font-dmSans font-normal text-inherit", className)}
      {...props}
    />
  );
}

export function DropdownMenuSub({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Sub
      className={cn("font-dmSans font-normal text-inherit", className)}
      {...props}
    />
  );
}

export function DropdownMenuRadioGroup({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      className={cn("font-dmSans font-normal text-inherit", className)}
      {...props}
    />
  );
}

export function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        "group flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-normal text-darkpurple outline-none focus:bg-lightpurple focus:text-white data-[state=open]:bg-lightpurple data-[state=open]:text-white",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4 duration-500 group-hover:rotate-[180deg]" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export function DropdownMenuSubContent({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        "bg-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-black shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
  return (
    <DropdownMenuPrimitive.Portal className="drop-shadow-offset-lg bg-white">
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "bg-popover z-50 w-[12rem] min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-black shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({ className, inset, ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-3 text-sm font-normal text-darkpurple outline-none transition-colors focus:bg-lightpurple focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm font-normal text-black outline-none transition-colors focus:bg-lightpurple focus:text-darkpurple data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({ className, children, ...props }) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm font-normal text-black text-purple outline-none transition-colors focus:bg-lightpurple focus:text-darkpurple data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <DotFilledIcon className="h-4 w-4 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({ className, inset, ...props }) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("bg-muted -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

export function DropdownMenuShortcut({ className, ...props }) {
  return (
    <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
  );
}
