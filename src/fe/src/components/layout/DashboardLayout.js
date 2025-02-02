"use client";

import { cn } from "@/libs/utils";

export default function DashboardLayout({ className, children }) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full flex-col bg-[blue] bg-grey p-[7px] md:p-[15px] lg:p-[20px] 2xl:p-[25px]",
        className,
      )}
    >
      {children}
    </section>
  );
}
