"use client";

import { useRouter } from "next/navigation";
import { ViewContractDetail } from "@/modules/dashboard/contracts/index";
import { DashboardBackHeader } from "@/components/UI/Dashboard/DashboardSkeleton";

export default function Page() {
  const payload = localStorage.getItem("curContract") ?? null;
  const router = useRouter();
  if (!payload) {
    return router.push("/dashboard/dashboard/");
  }
  console.log("Payload", JSON.parse(payload));
  return (
    <>
      <DashboardBackHeader />
      <ViewContractDetail contract={JSON.parse(payload)} />
    </>
  );
}
