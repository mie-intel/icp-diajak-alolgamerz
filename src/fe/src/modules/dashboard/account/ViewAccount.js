import {
  DashboardBox,
  DashboardData,
  DashboardSectionTitle,
  DashboardTitle,
  LineVertical,
} from "@/components/UI/Dashboard/DashboardBody";
import { Button1 } from "@/components/UI/Button";
import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

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
          <Link
            href="/dashboard/pricing"
            className="relative mt-[11px] flex w-fit flex-col font-dmSans text-[12px] font-[700] text-lightpurple transition-all duration-300 hover:text-darkpurple hover:underline md:mt-[18px] md:text-[13px] xl:text-[17px]"
          >
            <div className="flex items-center justify-start gap-0 duration-300">
              <span>Pricing</span>
              <GoArrowUpRight className="mb-1 ml-1 duration-300" />
            </div>
          </Link>
          <Button1 type="button" className="w-full self-end !p-[10px] !px-[15px]" outline>
            Log Out
          </Button1>
        </DashboardBox>
      </DashboardBox>
    </>
  );
}
