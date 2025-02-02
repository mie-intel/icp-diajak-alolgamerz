"use client";

import {
  DashboardBox,
  DashboardData,
  LineHorizontal,
} from "@/components/UI/Dashboard/DashboardBody";

import { Button1 } from "@/components/UI/Button";

import { cn } from "@/libs/utils";

import { DashboardTitle } from "../../../components/UI/Dashboard/DashboardBody";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export const LabelStatus = ({ status = "accepted" }) => {
  const statusConfig = {
    declined: {
      bordercolor: "border-[#F73639]",
      textcolor: "text-[#F73639]",
    },
    pending: {
      bordercolor: "border-[#E1BF00]",
      textcolor: "text-[#F73639]",
    },
    accepted: {
      bordercolor: "border-[#44BB1D]",
      textcolor: "text-[#44BB1D]",
    },
  };
  const selected = statusConfig[status];
  return (
    <>
      <span
        className={cn(
          "relative flex w-[150px] items-center justify-center self-center rounded-2xl px-[13px] py-[3px] text-[10px] font-[700] duration-300 md:px-[18px] md:text-[14px] xl:text-[18px] 2xl:rounded-3xl",
          "border-[1px] border-darkpurple bg-white font-[500] capitalize text-darkpurple md:border-[2px]",
          selected ? selected.bordercolor : "border-0 border-transparent",
          selected ? selected.textcolor : "text-transparent",
        )}
      >
        {status}
      </span>
    </>
  );
};

export function ButtonCommit({ action = "accept", ...props }) {
  const color = {
    accept: "bg-[#44BB1D] hover:bg-[green]",
    decline: "bg-[#F73639] hover:bg-[darkred]",
  };
  const icon = {
    accept: <AiOutlineCheck className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />,
    decline: <AiOutlineClose className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />,
  };
  return (
    <button
      className={cn(
        "rounded-3xl px-[12px] py-[3px] text-[8px] capitalize text-black text-white duration-300 md:px-[18px] md:py-[3px] md:text-[14px] lg:px-[24px] lg:py-[6px] xl:text-[18px]",
        color[action] && color[action],
      )}
      {...props}
    >
      <div className="flex items-center justify-evenly gap-[10px]">
        <span className="transition-all duration-300 group-hover:underline">{action}</span>
        {icon[action] && icon[action]}
      </div>
    </button>
  );
}

export function ViewMeetingDetail({
  contract = {
    name: "Contract Name",
    created: "03-02-2005",
    date: "Monday, 3 Februari 2025",
    meetStart: "16.00",
    meetEnd: "18.00",
    parties: ["Parties1", "Parties2", "Parties3"],
    proposedBy: "Parties1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus vulputate justo commodo ultrices. Proin fringilla enim est. Suspendisse tincidunt ut lacus vel convallis.",
    src: null,
    status: "declined",
  },
}) {
  const partiesList = contract.parties.length ? contract.parties.join(", ") : "";
  const startEnd = `${contract.meetStart} - ${contract.meetEnd} WIB`;
  return (
    <DashboardBox className="relative flex flex-col">
      <DashboardTitle
        title={
          <>
            <div className="flex items-center justify-start gap-[28px]">
              <span className="transition-all duration-300 group-hover:underline">
                {contract.name}
              </span>
              <LabelStatus status={contract.status} />
            </div>
          </>
        }
      />
      <DashboardData title="Date Created" isi={contract.created} date />
      <DashboardData title="Parties Involved" isi={partiesList} bold />
      <DashboardData title="Proposed by" isi={contract.proposedBy} bold />
      {contract.status === "pending" && (
        <div className="mt-[3px] flex w-full justify-end gap-[8px] md:gap-[15px] lg:gap-[18px]">
          <ButtonCommit action={"accept"} />
          <ButtonCommit action={"decline"} />
        </div>
      )}
      <LineHorizontal />
      <DashboardTitle title={"Meeting Details"} />
      <DashboardData title="Date" isi={contract.date} />
      <DashboardData title="Time" isi={startEnd} />
      <DashboardData title="Description" isi={contract.description} />
      <Button1 className="w-[60%] self-start max-md:self-center md:w-[30%] xl:w-[20%]" outline>
        Join Video Meeting
      </Button1>
    </DashboardBox>
  );
}
