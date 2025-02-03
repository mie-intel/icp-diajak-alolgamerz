import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";
import FormWithDropdown, { ButtonDropDown } from "@/components/UI/Button";

export default function Page() {
  return (
    <DashboardBox className="text-black">
      <ButtonDropDown className={"w-[50%]"} option={["Document", "Meeting"]} outline />
    </DashboardBox>
  );
}
