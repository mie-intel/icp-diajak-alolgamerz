import {
  DashboardBox,
  DashboardData,
  DashboardSectionTitle,
} from "@/components/UI/Dashboard/DashboardBody";

import { DashboardTitle } from "../../../components/UI/Dashboard/DashboardBody";
import { IoIosAlert, IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { GoArrowUpRight } from "react-icons/go";

export function ViewDocumentDetail({
  contract = {
    name: "Contract Name",
    date: "03-02-2005",
    parties: ["Parties1", "Parties2", "Parties3"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus vulputate justo commodo ultrices. Proin fringilla enim est. Suspendisse tincidunt ut lacus vel convallis.",
  },
  contractItem = [
    {
      name: "example docs 1",
      type: "Document",
      parties: "Company 1, Company 2",
      date: "24 Jan 2024",
      status: "accepted",
    },
    {
      name: "example docs 1",
      type: "Document",
      parties: "Company 1, Company 2",
      date: "24 Jan 2024",
      status: "declined",
    },
    {
      name: "example docs 1",
      type: "Document",
      parties: "Company 1, Company 2",
      date: "24 Jan 2024",
      status: "pending",
    },
  ],
}) {
  const partiesList = contract.parties.length ? contract.parties.join(", ") : "";
  return (
    <DashboardBox className="relative flex flex-col">
      <DashboardTitle
        title={
          <>
            <div className="flex items-center justify-start gap-0">
              <span className="transition-all duration-300 group-hover:underline">
                {contract.name}
              </span>
              <GoArrowUpRight className="mb-1 md:ml-2" />
            </div>
          </>
        }
      />
      <DashboardData title="Date Created" isi={contract.date} date />
      <DashboardData title="Parties Involved" isi={partiesList} bold />
      <DashboardBox className="relative mt-[11px] h-full bg-[#E3E3E3] !p-0 md:mt-[18px]">
        {/* <iframe src="" className="h-full w-full" /> */}
      </DashboardBox>
    </DashboardBox>
  );
}
