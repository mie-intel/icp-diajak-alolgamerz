"use client";

import {
  DashboardBox,
  DashboardData,
  LineHorizontal,
} from "@/components/UI/Dashboard/DashboardBody";

import { Button1 } from "@/components/UI/Button";

import { DashboardTitle } from "../../../components/UI/Dashboard/DashboardBody";

import { LabelStatus, ButtonCommit } from "./components";

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
