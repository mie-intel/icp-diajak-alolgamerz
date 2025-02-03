"use client";

import { cn, truncate } from "@/libs/utils";
import Image from "next/image";
import { DashboardSectionTitle, DashboardTitle } from "../Dashboard/DashboardBody";
import { statusConfig } from "@/libs/keys";
import { useNavigation } from "@/hooks/useNavigation";
import { def_contract } from "../../../libs/keys";
import {convertStatus} from "@/libs/utils"

export function CardStatus({ status }) {
  console.log("STATUS", status)
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
    ...def_contract
  },
  className,
}) {
  console.log(contracts)
  const {goToContractDetails} = useNavigation()
  console.log("CONTRACTS", contracts)
  return (
    <button
    type="button"
    onClick={() => goToContractDetails(JSON.stringify(contracts))}
      className={cn(
        "relative flex aspect-[352/238] w-[27%] flex-col justify-between rounded-xl bg-white p-[20px] duration-500 hover:scale-[1.01] hover:bg-[#E5ECFF] xl:rounded-3xl",
        className,
      )}
    >
      <div className="flex h-full w-full flex-col text-left">
        <div className="relative h-[38%] w-full overflow-clip rounded-lg lg:rounded-2xl">
          <Image alt="gambar kontrak" src="/assets/auth/bg.png" fill />
        </div>
        <DashboardTitle title={contracts.contractName} className={"mt-[12px] text-black"} />
        <DashboardSectionTitle
          title={truncate(contracts.contractParties, 30)}
          className="mt-0 font-[600]"
        />
      </div>
      <div className="flex w-full items-center justify-between font-dmSansRegular font-[500] text-lightpurple md:text-[14px] 2xl:text-[18px]">
        <p>Last Modified: {contracts.lastModified}</p>
        <CardStatus status={convertStatus(contracts.isFinalised)} />
      </div>
    </button>
  );
}
