import {
  DashboardBox,
  DashboardData,
  DashboardSectionTitle,
  DashboardTitle,
  LineHorizontal,
  LineVertical,
} from "@/components/UI/Dashboard/DashboardBody";
import { Button1 } from "@/components/UI/Button";
import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";

export default function ViewAccount({
  account = {
    accountName: "Radhya Bebek",
    email: "example@gmail.com",
    password: "Password",
    publicKey: "10134jfa",
    accountStatus: "verified",
    businessName: "Radhya Bebek",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus vulputate justo commodo ultrices. Proin fringilla enim est. Suspendisse tincidunt ut lacus vel convallis. ",
    phoneNumber: "+123456789",
  },
}) {
  return (
    <>
      <DashboardBox className="text-darkpurple">
        <div className="relative flex h-full w-full items-center justify-around px-[3vw] md:px-[5vw] lg:px-0">
          <DashboardBox className="w-[40%] self-center md:w-[40%] lg:w-[20%]">
            <DashboardSectionTitle title="Account Details" />
            <DashboardData title="Account Name" isi={account.accountName} />
            <DashboardData title="Email" isi={account.email} />
            <DashboardData title="Password" isi={account.password} hidden />
            <DashboardData title="Public Key" isi={account.publicKey} />
            <DashboardData title="Account Status" isi={account.accountStatus} verified />
          </DashboardBox>
          <LineVertical className={"h-full self-center"} />
          <DashboardBox className="flex w-[70%] flex-col md:w-[70%] lg:w-[60%]">
            <DashboardTitle title="Business Profile" />
            <DashboardData title="Name" isi={account.businessName} />
            <DashboardData title="Description" isi={account.description} />
            <DashboardSectionTitle title="Contact" />
            <DashboardData title="Email" isi={account.email} />
            <DashboardData title="Phone Number" isi={account.phoneNumber} />
            <Button1 className="w-[50%] self-end md:w-[40%] lg:w-[30%]" outline>
              Edit
            </Button1>
          </DashboardBox>
        </div>
      </DashboardBox>
    </>
  );
}
