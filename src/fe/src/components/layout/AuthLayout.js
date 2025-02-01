import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <section className="flex min-h-screen w-full flex-row max-lg:bg-[url('/assets/auth/bg.png')] max-lg:bg-cover max-lg:bg-right lg:bg-none">
      <div className="absolute bottom-0 h-min w-full overflow-clip bg-white pt-[5px] max-lg:rounded-t-[50px] md:pt-[20px] lg:relative lg:h-screen lg:w-[50%] lg:pt-0">
        {children}
      </div>
      <div className="min-h-screen w-[50%] bg-white max-lg:hidden">
        <div className="flex h-full w-full items-center justify-center rounded-bl-[15%] bg-[red] bg-[url('/assets/auth/bg.png')] bg-cover bg-right font-dmSans text-[100px]">
          <h1 className="max-w-[50%] font-[600] lg:text-[40px] 2xl:text-[65px]">
            Big Quote About Our Product Here
          </h1>
        </div>
      </div>
    </section>
  );
}
