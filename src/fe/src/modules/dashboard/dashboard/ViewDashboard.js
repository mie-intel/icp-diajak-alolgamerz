"use client";

import { DashboardBox, DashboardTitle } from "@/components/UI/Dashboard/DashboardBody";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/UI/table";
import { CardContract } from "@/components/UI/Card/CardContract";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosAlert, IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";

export function ViewDashboard() {
  const contractItem = [
    {
      name: "example docs 1",
      contract: "Contract 1",
      status: "accepted",
    },
    {
      name: "example docs 1",
      contract: "Contract 1",
      status: "declined",
    },
    {
      name: "example docs 1",
      contract: "Contract 1",
      status: "pending",
    },
  ];
  const iconStatus = {
    declined: <IoIosCloseCircle className="mb-1 ml-2 h-4 w-4 text-[#F73639] lg:h-5 lg:w-5" />,
    accepted: <IoIosCheckmarkCircle className="mb-1 ml-2 h-4 w-4 text-[#05CD99] lg:h-5 lg:w-5" />,
    pending: <IoIosAlert className="mb-1 ml-2 h-4 w-4 text-[#FFCE20] lg:h-5 lg:w-5" />,
  };

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

  const filteredContracts = contractList.slice(0, Math.min(contractList.length, 3));

  return (
    <DashboardBox className="flex flex-col gap-[8px] bg-grey max-lg:overflow-y-scroll lg:gap-[16px]">
      <DashboardBox className="flex flex-col bg-grey !p-0 md:flex-row">
        <DashboardBox className="h-full w-full md:w-[50%]">
          <DashboardTitle title="Pending Approval" className="!mb-[5px] !mt-0" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead className={"text-transparent"}>Status</TableHead>
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
                          {item.name}
                        </span>
                        <GoArrowUpRight className="mb-1 md:ml-2" />
                      </div>
                    </button>
                  </TableCell>
                  <TableCell className="max-md:min-w-[70px]">{item.contract}</TableCell>
                  <TableCell bold className="w-[6px] md:w-[10px]">
                    {iconStatus[item.status] && iconStatus[item.status]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DashboardBox>
      </DashboardBox>
      <DashboardBox className="bg-transparent !px-0">
        <DashboardTitle
          title={
            <>
              <div className="flex items-center justify-start gap-0">
                <span className="transition-all duration-300 group-hover:underline">
                  Recent Contracts&nbsp;&nbsp;
                </span>
                <Link
                  href="/dashboard/contracts"
                  className="self-center text-[9px] text-lightpurple underline duration-300 hover:text-purple md:text-sm"
                >
                  see all
                </Link>
              </div>
            </>
          }
          className="!mb-[5px] !mt-0 bg-transparent"
        />
        <DashboardBox
          className={
            "relative grid auto-rows-min grid-cols-1 gap-[15px] bg-grey !p-0 !pt-0 md:grid-cols-2 xl:grid-cols-3"
          }
        >
          {filteredContracts.map((item) => (
            <CardContract key={JSON.stringify(item)} className="w-full" contracts={item} />
          ))}
        </DashboardBox>
      </DashboardBox>
    </DashboardBox>
  );
}
