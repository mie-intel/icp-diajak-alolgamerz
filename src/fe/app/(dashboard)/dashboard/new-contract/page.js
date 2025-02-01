"use client";

import {
  DashboardBox,
  DashboardData,
  DashboardHeading,
  DashboardSectionTitle,
  DashboardTitle,
} from "@/components/UI/Dashboard/DashboardBody";

import NewContract from "@/modules/dashboard/new-contract/new-contract";

export default function Page() {
  return (
    <>
      <NewContract />
    </>
  );
}
