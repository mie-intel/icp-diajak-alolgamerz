"use client";

import { MdKeyboardControlKey } from "react-icons/md";
import { cn } from "@/libs/utils";

export function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom text-lg", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, children, ...props }) {
  return (
    <th
      className={cn(
        "text-muted-foreground h-7 text-nowrap break-words text-left align-middle text-xs font-medium text-lightpurple max-md:pr-[5px] lg:max-w-[300px] lg:text-[14px] xl:text-[15px] [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-start">
        <span>{children}</span>
        <MdKeyboardControlKey className="mb-1 ml-2 rotate-[180deg]" />
      </div>
    </th>
  );
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableFooter({ className, ...props }) {
  return (
    <tfoot className={cn("bg-primary text-primary-foreground font-medium", className)} {...props} />
  );
}

export function TableCell({ className, bold, ...props }) {
  return (
    <td
      className={cn(
        "text-muted-foreground mt-0 break-words pt-[12px] text-[10px] leading-tight text-darkpurple max-md:px-[5px] md:text-sm lg:mt-[8px] lg:max-w-[200px] lg:text-[14px]",
        className,
        bold && "font-[700]",
      )}
      {...props}
    />
  );
}
