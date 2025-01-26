import DefaultLayout from "@/components/layout/DefaultLayout";
import WebCamera from "@/components/UI/WebCamera";

export default function Home() {
  return (
    <DefaultLayout>
      <WebCamera className="relative h-[1000px] w-[1000px] bg-[black]" />
    </DefaultLayout>
  );
}
