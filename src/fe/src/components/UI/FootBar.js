"use client";

import { MdFileCopy, MdHome, MdPerson } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footbar() {
  const curPath = usePathname();
  const iconClassname = "w-[5vw] h-[5vw] md:w-[2.8vw] md:h-[2.8vw] self-center";
  const path = [
    {
      name: "Dashboard",
      href: "/dashboard/dashboard",
      icon: <MdHome className={iconClassname} />,
    },
    {
      name: "Account",
      href: "/dashboard/account",
      icon: <MdPerson className={iconClassname} />,
    },
    {
      name: "Contracts",
      href: "/dashboard/contracts",
      icon: <MdFileCopy className={iconClassname} />,
    },
    {
      name: "New Contract",
      href: "/dashboard/new-contract",
      icon: <AiFillPlusCircle className={iconClassname} />,
    },
  ];

  const [active, setActive] = useState("Dashboard");
  return (
    <div className="flex h-[9dvh] w-full justify-center bg-white lg:hidden">
      <div className="flex h-full w-[90%] justify-between p-[10px] py-[12px] md:py-[18px]">
        {path.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center justify-center rounded-xl px-[10px] py-[3px] md:px-[15px]",
              item.href === curPath ? "bg-grey text-darkpurple" : "bg-white text-purple",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center gap-0",
                item.href === curPath && "gap-[5px] md:gap-[10px]",
              )}
            >
              {item.icon}

              <span
                className={cn(
                  "text-[0vw] font-[700] transition-all duration-300",
                  item.href === curPath && "text-[2.5vw] md:text-[1.6vw]",
                )}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
