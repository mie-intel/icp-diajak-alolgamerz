"use client";

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

import { useState } from "react";

import { ButtonDropDown } from "../../../components/UI/Button";
import { DashboardTitle } from "../../../components/UI/Dashboard/DashboardBody";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosAlert, IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { def_contract, def_list_contractItem } from "../../../libs/keys";
import {convertStatus} from "@/libs/utils"

const StatusCell = ({ status }) => {
  const iconStatus = {
    rejected: <IoIosCloseCircle className="mb-1 ml-2 h-5 w-5 text-[#F73639]" />,
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
  contract = {...def_contract},
  contractItem = [...def_list_contractItem]
}) {
  console.log(JSON.stringify(contract))
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemSelect = (item) => {
    setSelectedItem(item); // Update state in the parent component
    console.log("Selected Item:", item); // Do something with the selected value
  };

  const partiesList = contract.contractParties.length ? contract.contractParties.join(", ") : "";
  return (
    <DashboardBox className="flex flex-col justify-between">
      <DashboardBox className="!p-0">
        <DashboardTitle title={contract.contractName} />
        <DashboardData title="Date Created" isi={contract.lastModified} date />
        <DashboardData title="Parties" isi={partiesList} bold />
        <DashboardData title="Description" isi={contract.contractDescription} />
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
                <TableCell
                  bold
                  className="group duration-300 hover:scale-[1.01] max-md:min-w-[70px]"
                >
                  <button type="button">
                    <div className="flex items-center justify-start gap-0">
                      <span className="transition-all duration-300 group-hover:underline">
                        {item.title}
                      </span>
                      <GoArrowUpRight className="mb-1 md:ml-2" />
                    </div>
                  </button>
                </TableCell>
                <TableCell className="max-md:min-w-[70px]">{item.type}</TableCell>
                <TableCell className="max-md:min-w-[70px]">{item.parties}</TableCell>
                <TableCell className="max-md:min-w-[70px]">{item.dateCreated}</TableCell>
                <TableCell bold className="max-md:min-w-[70px]">
                  <StatusCell status={convertStatus(item.isFinalised)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardBox>

      <ButtonDropDown
        className={"relative w-full self-end md:w-[26%] lg:w-[17%]"}
        option={["Document", "Video Meeting"]}
        onSelect={handleItemSelect}
        outline
      >
        Add New Item
      </ButtonDropDown>
    </DashboardBox>
  );
}
