import DefaultLayout from "@/components/layout/DefaultLayout";
import WebCamera from "@/components/UI/WebCamera";

export default function Home() {
  return (
    <DefaultLayout>
      <WebCamera className="relative h-[600px] w-[600px] bg-[black]" />
    </DefaultLayout>
  );
}
