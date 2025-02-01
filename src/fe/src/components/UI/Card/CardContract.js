"use client";

import { cn, truncate } from "@/libs/utils";
import Image from "next/image";
import { DashboardSectionTitle, DashboardTitle } from "../Dashboard/DashboardBody";
import { statusConfig } from "@/libs/keys";

export function CardStatus({ status }) {
  return (
    <div
      className={cn(
        "rounded-xl px-[12px] py-[6px] text-[12px] capitalize text-white",
        statusConfig[status].bgcolor,
      )}
    >
      {status}
    </div>
  );
}

export function CardContract({
  contracts = {
    title: "Arya",
    status: "invalid",
    parties: ["Arya1", "Arya2", "Company2", "Company3", "Company5"],
    modified: "22/22/2025",
  },
  className,
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[352/238] w-[27%] flex-col justify-between rounded-xl bg-white p-[20px] duration-500 hover:scale-[1.01] hover:bg-[#E5ECFF] xl:rounded-3xl",
        className,
      )}
    >
      <div className="flex h-full w-full flex-col">
        <div className="relative h-[38%] w-full overflow-clip rounded-lg lg:rounded-2xl">
          <Image alt="gambar kontrak" src="/assets/auth/bg.png" fill />
        </div>
        <DashboardTitle title={contracts.title} className={"mt-[12px] text-black"} />
        <DashboardSectionTitle
          title={truncate(contracts.parties, 30)}
          className="mt-0 font-[600]"
        />
      </div>
      <div className="flex w-full items-center justify-between font-dmSansRegular font-[500] text-lightpurple md:text-[14px] 2xl:text-[18px]">
        <p>Last Modified: {contracts.modified}</p>
        <CardStatus status={contracts.status} />
      </div>
    </div>
  );
}
