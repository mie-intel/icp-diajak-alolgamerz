"use client";

import { getLastPath } from "@/libs/path";

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
