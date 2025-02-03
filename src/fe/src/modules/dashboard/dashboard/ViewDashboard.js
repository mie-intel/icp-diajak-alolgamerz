"use client";

import {
  DashboardBox,
  DashboardHeading,
  DashboardSectionTitle,
  DashboardTitle,
} from "@/components/UI/Dashboard/DashboardBody";
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
import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import { truncate } from "@/libs/utils";

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

  const meetingList = [
    {
      name: "Example Video Meetingasdasd",
      contract: "Contract 1",
      parties: ["Arya1", "Arya2", "Company2", "Company3", "Company5"],
      date: "24 Jan",
      meetStart: "16.00",
      meetEnd: "18.00",
    },
    {
      name: "Example Video Masdasdeeting",
      contract: "Contract 1",
      parties: ["Arya1", "Arya2", "Company2", "Company3", "Company5"],
      date: "24 Jan",
      meetStart: "16.00",
      meetEnd: "18.00",
    },
    {
      name: "Example Vidasdasdeo Meeting",
      contract: "Contract 1",
      parties: ["Arya1", "Arya2", "Company2", "Company3", "Company5"],
      date: "24 Jan",
      meetStart: "16.00",
      meetEnd: "18.00",
    },
    {
      name: "Example Video Meeasdasting",
      contract: "Contract 1",
      parties: ["Arya1", "Arya2", "Company2", "Company3", "Company5"],
      date: "24 Jan",
      meetStart: "16.00",
      meetEnd: "18.00",
    },
  ];

  return (
    <DashboardBox className="flex flex-col gap-[8px] bg-grey max-lg:overflow-y-scroll lg:max-h-screen lg:gap-[16px]">
      <DashboardBox className="flex flex-col justify-between bg-grey !p-0 max-lg:gap-[10px] md:flex-row lg:max-h-[44%]">
        <DashboardBox className="h-full w-full max-lg:px-[12px] md:w-[49%]">
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
                      <div className="group flex items-center justify-start gap-0 text-darkpurple duration-300 hover:scale-[1.01] hover:text-lightpurple">
                        <span className="transition-all">{item.name}</span>
                        <GoArrowUpRight className="mb-1 duration-300 md:ml-2" />
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
        <DashboardBox className="flex h-full w-full flex-col overflow-y-scroll max-lg:px-[12px] md:w-[49%]">
          <DashboardTitle title="Upcoming Meetings" className="!mb-[5px] !mt-0" />
          <DashboardBox className="flex flex-col gap-[10px] !p-0 max-md:my-[5px]">
            {meetingList.slice(0, Math.min(3, meetingList.length)).map((item) => {
              return (
                <DashboardBox
                  key={JSON.stringify(item)}
                  className="drop-shadow-offset flex h-fit w-full justify-between self-center max-md:px-[15px] max-sm:px-[8px] sm:w-[90%] md:w-full"
                >
                  <span className="w-fit self-center lg:w-[70%]">
                    <DashboardHeading
                      title={
                        <>
                          <button type="button">
                            <div className="group flex items-center justify-start gap-0 text-darkpurple duration-300 hover:scale-[1.01] hover:text-lightpurple">
                              <span className="transition-all">{item.name}</span>
                              <GoArrowUpRight className="mb-1 duration-300 md:ml-2" />
                            </div>
                          </button>
                        </>
                      }
                      className="!mt-0 text-[12px] sm:text-[14px] md:!mt-0 md:text-[17px] xl:text-[18px]"
                    />
                    <DashboardSectionTitle
                      title={item.contract}
                      className="!mt-0 text-[10px] sm:text-[12px] md:!mt-1 md:text-[14px] xl:text-[17px]"
                    />
                    <DashboardSectionTitle
                      title={truncate(item.parties, 40)}
                      className="!mt-0 text-[9px] text-lightpurple sm:text-[11px] md:!mt-1 md:text-[12px] xl:text-[15px]"
                    />
                  </span>
                  <div className="w-fit self-center text-center">
                    <DashboardHeading
                      title={item.date}
                      className="!mt-0 text-[12px] font-[500] sm:text-[14px] md:text-[17px] xl:text-[17px]"
                    />
                    <DashboardSectionTitle
                      title={`${item.meetStart} - ${item.meetEnd} WIB`}
                      className="!mt-0 text-[9px] font-[700] sm:text-[11px] md:text-[14px] xl:text-[15px]"
                    />
                  </div>
                </DashboardBox>
              );
            })}
          </DashboardBox>
        </DashboardBox>
      </DashboardBox>
      <DashboardBox className="h-fit bg-transparent !px-0">
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
            "max-row-1 relative grid auto-rows-min grid-cols-1 gap-[15px] bg-grey !p-0 !pt-0 md:grid-cols-2 xl:grid-cols-3"
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
      </DashboardBox>
    </DashboardBox>
  );
}
