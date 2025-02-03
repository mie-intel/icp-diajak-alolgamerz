"use client";

import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";
import { CardContract } from "@/components/UI/Card/CardContract";
import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import { cn } from "@/libs/utils";
import { useState } from "react";

const contractList = [
  {
    title: "Arya",
    status: "success",
    parties: ["Arya1", "Arya2", "Company2", "Company3", "Company5"],
    modified: "22/22/2025",
  },
  {
    title: "Arya2",
    status: "pending",
    parties: ["Arya1", "Arya2", "Company2", "Company3", "Company5"],
    modified: "22/22/2025",
  },
  {
    title: "Arya3",
    status: "invalid",
    parties: ["Arya1", "Arya2", "Company2", "Company3", "Company5"],
    modified: "22/22/2025",
  },
];

export function ViewContractList() {
  const options = ["all", "success", "pending", "invalid"];
  const [status, setStatus] = useState("all");
  const filteredContracts = contractList.filter(
    (item) => status === "all" || item.status === status,
  );
  return (
    <>
      <DashboardHeader />
      <DashboardBox className="flex h-fit w-[100%] justify-center bg-grey !p-0">
        <DashboardBox className="flex h-full w-full justify-start gap-[5px] bg-grey md:gap-[12px] lg:gap-[20px] xl:gap-[25px]">
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={cn(
                "rounded-[20px] px-[10px] py-[3px] font-dmSans text-[10px] capitalize text-darkpurple duration-300 hover:bg-lightpurple hover:text-white md:px-[17px] md:text-[12px] lg:px-[25px] lg:text-[14px] xl:text-[17px]",
                status === item ? "bg-white" : "bg-inherit",
              )}
            >
              {item}
            </button>
          ))}
        </DashboardBox>
      </DashboardBox>
      <DashboardBox
        className={
          "relative grid auto-rows-min grid-cols-1 gap-[15px] bg-grey !pt-0 md:grid-cols-2 xl:grid-cols-3"
        }
      >
        {filteredContracts.map((item) => (
          <CardContract
            key={JSON.stringify(item)}
            className="drop-shadow-offset w-full"
            contracts={item}
          />
        ))}
      </DashboardBox>
    </>
  );
}
