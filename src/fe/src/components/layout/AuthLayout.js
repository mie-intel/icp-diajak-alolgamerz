import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <section className="flex min-h-screen w-full flex-row">
      <div className="min-h-screen w-[50%] bg-white">{children}</div>
      <div className="min-h-screen w-[50%] bg-white">
        <div className="font-dmSans flex h-full w-full items-center justify-center rounded-bl-[15%] bg-[red] bg-[url('/assets/auth/bg.png')] bg-cover bg-right text-[100px]">
          <h1 className="max-w-[50%] font-[600] lg:text-[40px] 2xl:text-[65px]">
            Big Quote About Our Product Here
          </h1>
        </div>
      </div>
    </section>
  );
}
