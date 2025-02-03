"use client";

import { DashboardBox, DashboardData } from "@/components/UI/Dashboard/DashboardBody";
import { DashboardTitle } from "../../../components/UI/Dashboard/DashboardBody";
import { LabelStatus, ButtonCommit } from "./components";
import { def_contract } from "@/libs/keys";
import { convertStatus } from "@/libs/utils";

export function ViewDocumentDetail({
  contract = {
    // name: "Contract Name",
    // date: "03-02-2005",
    // parties: ["Parties1", "Parties2", "Parties3"],
    // description:
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus vulputate justo commodo ultrices. Proin fringilla enim est. Suspendisse tincidunt ut lacus vel convallis.",
    // src: null,
    // status: "declined",
    ...def_contract,
  },
}) {
  const partiesList = contract.contractParties.length ? contract.contractParties.join(", ") : "";
  return (
    <DashboardBox className="relative flex flex-col">
      <DashboardTitle
        title={
          <>
            <div className="flex items-center justify-start gap-[28px]">
              <span className="transition-all duration-300 group-hover:underline">
                {contract.contractName}
              </span>
              <LabelStatus status={convertStatus(contract.isFinalised)} />
            </div>
          </>
        }
      />
      <DashboardData title="Date Created" isi={contract.lastModified} date />
      <DashboardData title="Parties Involved" isi={partiesList} bold />
      {contract.status === "pending" && (
        <div className="mt-[3px] flex w-full justify-end gap-[8px] md:gap-[15px] lg:gap-[18px]">
          <ButtonCommit action={"accept"} />
          <ButtonCommit action={"decline"} />
        </div>
      )}
      <DashboardBox className="relative mt-[11px] h-full bg-[#E3E3E3] !p-0 md:mt-[18px]">
        {/* {contract.src && <iframe src="" className="h-full w-full" />} */}
      </DashboardBox>
    </DashboardBox>
  );
}
