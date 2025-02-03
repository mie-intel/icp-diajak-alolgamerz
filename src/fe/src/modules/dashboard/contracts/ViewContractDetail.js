import {
  DashboardBox,
  DashboardData,
  DashboardSectionTitle,
} from "@/components/UI/Dashboard/DashboardBody";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/UI/table";

import { ButtonDropDown } from "../../../components/UI/Button";

import { DashboardTitle } from "../../../components/UI/Dashboard/DashboardBody";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosAlert, IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const StatusCell = ({ status }) => {
  const iconStatus = {
    declined: <IoIosCloseCircle className="mb-1 ml-2 h-5 w-5 text-[#F73639]" />,
    accepted: <IoIosCheckmarkCircle className="mb-1 ml-2 h-5 w-5 text-[#05CD99]" />,
    pending: <IoIosAlert className="mb-1 ml-2 h-5 w-5 text-[#FFCE20]" />,
  };
  return (
    <div className="flex items-center justify-start gap-2">
      {iconStatus[status]}
      <span className="self-center capitalize transition-all duration-300 group-hover:underline md:self-start">
        {status}
      </span>
    </div>
  );
};

export function ViewContractDetail({
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
    <DashboardBox>
      <DashboardTitle title={contract.name} />
      <DashboardData title="Date Created" isi={contract.date} date />
      <DashboardData title="Parties" isi={partiesList} bold />
      <DashboardData title="Description" isi={contract.description} />
      <DashboardSectionTitle
        title={"Contract Items"}
        className="text-[15px] font-[700] md:text-[18px] xl:text-[24px]"
      />
      <Table className={"mt-[5px] lg:mt-[10px]"}>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Parties Involved</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={"!text-[#2B3674]"}>
          {contractItem.map((item) => (
            <TableRow key={JSON.stringify(item)}>
              <TableCell bold className="group duration-300 hover:scale-[1.01] max-md:min-w-[70px]">
                <button type="button">
                  <div className="flex items-center justify-start gap-0">
                    <span className="transition-all duration-300 group-hover:underline">
                      {item.name}
                    </span>
                    <GoArrowUpRight className="mb-1 md:ml-2" />
                  </div>
                </button>
              </TableCell>
              <TableCell className="max-md:min-w-[70px]">{item.type}</TableCell>
              <TableCell className="max-md:min-w-[70px]">{item.parties}</TableCell>
              <TableCell className="max-md:min-w-[70px]">{item.date}</TableCell>
              <TableCell bold className="max-md:min-w-[70px]">
                <StatusCell status={item.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ButtonDropDown>Add New Item</ButtonDropDown>
    </DashboardBox>
  );
}
