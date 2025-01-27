"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdFileCopy, MdHome, MdPerson } from "react-icons/md";

export default function Sidebar() {
  const path = [
    {
      name: "Dashboard",
      href: "/dashboard/dashboard",
      icon: <MdHome className="h-[90%] w-[10%]" />,
    },
    {
      name: "Account",
      href: "/dashboard/account",
      icon: <MdPerson className="h-[90%] w-[10%]" />,
    },
    {
      name: "Contracts",
      href: "/dashboard/contracts",
      icon: <MdFileCopy className="h-[90%] w-[10%]" />,
    },
  ];

  const curPath = usePathname();
  let lastPath = curPath.split("/");
  lastPath = lastPath.length !== 1 ? lastPath[lastPath.length - 1] : "";

  return (
    <div className="font-dmSans text-blackpurple relative flex min-h-screen w-[18%] flex-col items-end gap-[20px] bg-white">
      {/* Head */}
      <div className="flex aspect-[270/130] w-full items-center justify-center gap-[2px] text-[9px] md:text-[15px] lg:text-[20px] 2xl:text-[25px]">
        <h1>Arya</h1>
        <p>|</p>
        <h2>Apo</h2>
      </div>
      <div className="flex h-auto min-h-fit w-full flex-col">
        {path.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                curPath === item.href ? "text-blackpurple" : "text-purple",
                "hover:bg-lightpurple group relative flex aspect-[9/2] w-[100%] flex-row items-center justify-start gap-[5px] pl-[10%] text-[20px] transition-all duration-500 hover:text-white",
              )}
            >
              {item.icon}
              <h5 className="pl-[5px] text-[8px] font-[600] lg:text-[10px] xl:text-[13px] 2xl:text-[16px]">
                {item.name}
              </h5>

              <div
                className={cn(
                  curPath === item.href ? "bg-darkpurple" : "group-hover:bg-lightpurple bg-white",
                  "absolute right-0 h-full w-[2.5%] rounded-lg transition-all duration-500",
                )}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
