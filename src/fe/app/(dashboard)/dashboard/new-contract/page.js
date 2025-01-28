import {
  DashboardBox,
  DashboardData,
  DashboardHeading,
  DashboardSectionTitle,
  DashboardTitle,
} from "@/components/UI/Dashboard/DashboardBody";

export default function Page() {
  return (
    <DashboardBox className="flex w-[30%] flex-col">
      <DashboardTitle title="Bussiness Profile" />
      <DashboardHeading title="Account Details" />
      <DashboardSectionTitle title="Account Details" />
      <DashboardData title="Bussiness Name" isi={<>Example Business Name</>} />
      <DashboardData title="Email" isi={<>example@email.com</>} verified />
      <DashboardData title="Password" isi={"Ini rahasia"} hidden />
      <DashboardData title="Public Key" isi={"105D38HKSD"} />
      <DashboardData title="Account Status" isi="Verified" verified />
    </DashboardBox>
  );
}
