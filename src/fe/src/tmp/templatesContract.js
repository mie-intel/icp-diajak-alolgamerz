import { CardContract } from "@/components/UI/Card/CardContract";
import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";

export default function Page() {
  return (
    <>
      <DashboardBox
        className={
          "relative grid auto-rows-min grid-cols-1 gap-[15px] bg-grey md:grid-cols-2 xl:grid-cols-3"
        }
      >
        <CardContract className="w-full" />
        <CardContract className="w-full" />
        <CardContract className="w-full" />
        <CardContract className="w-full" />
      </DashboardBox>
    </>
  );
}
