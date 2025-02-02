import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";

export default function DashboardLayout({ children }) {
  return (
    <section className="relative flex min-h-screen w-full flex-col bg-grey p-[7px] md:p-[15px] lg:p-[20px] 2xl:p-[25px]">
      {children}
    </section>
  );
}
