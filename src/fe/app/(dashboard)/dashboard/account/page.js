"use client";

import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import ViewAccount from "@/modules/dashboard/account/ViewAccount";
import EditAccount from "@/modules/dashboard/account/EditAccount";
import { useEffect, useState } from "react";
import { myaxios } from "@/libs/myaxios";
export default function Page() {
  const [data, setData] = useState({});
  useEffect(async ()=>{
    
  }, []);

  return (
    <>
      <DashboardHeader />
      {/* <EditAccount /> */}
      <ViewAccount account = {data} />
    </>
  );
}
