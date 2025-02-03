import {
  DashboardBox,
  DashboardSuperTitle,
  DashboardTitle,
} from "@/components/UI/Dashboard/DashboardBody";

export default function Page() {
  return (
    <DashboardBox className="flex items-center justify-center">
      <DashboardBox className="h-fit w-fit">
        <DashboardSuperTitle title="Plan" className="!mt-0 !p-0" />
        <DashboardTitle title="Rp 900.000 / month" />
      </DashboardBox>
    </DashboardBox>
  );
}
