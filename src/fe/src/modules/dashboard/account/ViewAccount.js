import {
  DashboardBox,
  DashboardData,
  DashboardSectionTitle,
  DashboardTitle,
  LineVertical,
} from "@/components/UI/Dashboard/DashboardBody";
import { Button1 } from "@/components/UI/Button";
import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";

export default function EditAccount({
  account = {
    businessName: "Radhya Bebek",
    email: "example@gmail.com",
    publicKey: "10134jfa",
    isVerified: "verified",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus vulputate justo commodo ultrices. Proin fringilla enim est. Suspendisse tincidunt ut lacus vel convallis. ",
  },
}) {
  return (
    <>
      <DashboardBox className="text-darkpurple">
        <DashboardBox className="!m-0 w-[40%] self-center !py-0 md:w-[40%] lg:w-[20%]">
          <DashboardTitle title="Business Details" />
          <DashboardData title="Business Name" isi={account.businessName} />
          <DashboardData title="Email" isi={account.email} />
          <DashboardData title="Public Key" isi={account.publicKey} />
          <DashboardData title="Account Status" isi={account.isVerified} verified />
        </DashboardBox>
      </DashboardBox>
    </>
  );
}
