"use client";

import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import ViewAccount from "@/modules/dashboard/account/ViewAccount";
import EditAccount from "@/modules/dashboard/account/EditAccount";
export default function Page() {
  return (
    <>
      <DashboardHeader />
      {/* <EditAccount /> */}
      <ViewAccount />
    </>
  );
}
