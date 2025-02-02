"use client";

import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import ViewAccount from "@/modules/dashboard/account/ViewAccount";
export default function Page() {
  return (
    <>
      <DashboardHeader />
      <ViewAccount />
    </>
  );
}
