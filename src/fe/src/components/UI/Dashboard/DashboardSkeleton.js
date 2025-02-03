"use client";

import { getLastPath } from "@/libs/path";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DashboardHeader() {
  const lastPath = getLastPath().replaceAll("-", " ");
  return (
    <div className="mb-[10px] flex w-full flex-row justify-start text-darkpurple">
      <div className="flex flex-col">
        <h4 className="text-[1.6vw] capitalize lg:text-[15px] xl:text-[20px]">
          {"Pages / "}
          {lastPath}
        </h4>
        <h2 className="text-[3.4vw] font-[700] capitalize leading-snug lg:mt-[2px] lg:text-[28px] xl:text-[41px]">
          {lastPath}
        </h2>
      </div>
    </div>
  );
}

export function DashboardBackHeader() {
  const path = usePathname();
  let splitPath = path.split("/");
  let backPath = "";
  if (splitPath.length === 1) backPath = "";
  else {
    backPath = splitPath.slice(0, splitPath.length - 1).join("/");
  }
  return (
    <div className="mb-[10px] flex w-full flex-row justify-start text-darkpurple">
      <div className="flex flex-col">
        <Link
          href={backPath}
          className="text-[1.6vw] capitalize duration-300 hover:text-purple lg:text-[15px] xl:text-[20px]"
        >
          {"< back"}
        </Link>
      </div>
    </div>
  );
}
