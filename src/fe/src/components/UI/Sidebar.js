"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdFileCopy, MdHome, MdPerson } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import Image from "next/image";
import { LineHorizontal } from "./Dashboard/DashboardBody";

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

  return (
    <div className="relative flex min-h-screen w-[18%] flex-col items-end gap-[20px] bg-white font-dmSans text-blackpurple max-lg:hidden">
      {/* Head */}
      <div className="relative flex aspect-[270/130] w-full items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto aspect-[130/31] w-[140px]">
          <Image alt="pactlock" src="/assets/PactLockDark.png" fill />
        </div>
      </div>
      {/* Path 3 tempat */}
      <div className="flex h-auto w-full flex-col">
        {path.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                curPath === item.href ? "text-blackpurple" : "text-purple",
                "group relative flex aspect-[9/2] w-[100%] flex-row items-center justify-start gap-[5px] pl-[10%] text-[20px] transition-all duration-300 hover:bg-lightpurple hover:text-white",
              )}
            >
              {item.icon}
              <h5 className="pl-[5px] text-[8px] font-[600] lg:text-[10px] xl:text-[13px] 2xl:text-[16px]">
                {item.name}
              </h5>

              <div
                className={cn(
                  curPath === item.href ? "bg-darkpurple" : "bg-white group-hover:bg-lightpurple",
                  "absolute right-0 h-full w-[2.5%] rounded-lg transition-all duration-300",
                )}
              />
            </Link>
          );
        })}
      </div>
      {/* New Contract */}
      <div className="flex w-full items-center justify-center">
        <button
          type="button"
          className="group flex w-[80%] items-center justify-center bg-lightpurple text-[8px] font-[600] text-white duration-300 hover:bg-darkpurple hover:text-lightpurple active:bg-lightpurple active:text-grey md:rounded-md lg:rounded-xl lg:text-[12px] xl:text-[15px] 2xl:text-[18px]"
        >
          <Link
            href="/dashboard/new-contract"
            className="flex h-full w-full items-center justify-between py-[5%] pl-[7%] pr-[5%]"
          >
            New Contract
            <div className="relative flex aspect-square w-[20%] items-center justify-center rounded-lg bg-grey p-0 text-lightpurple duration-300 group-hover:bg-lightpurple group-hover:text-darkpurple group-active:bg-grey group-active:text-lightpurple">
              <AiFillPlusCircle className="absolute aspect-square h-[60%] w-[60%]" />
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
}
