import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <section className="flex min-h-screen w-full flex-col items-center max-lg:bg-[url('/assets/auth/bg.png')] max-lg:bg-cover max-lg:bg-right lg:flex-row lg:bg-none">
      <div className="absolute top-[7%] aspect-[131/30] w-[45%] md:w-[30%] lg:hidden">
        <div className="absolute left-0 top-0 -ml-[10px] aspect-[131/30] w-full">
          <Image alt="Pactlock" src="/assets/PactLockLight.png" fill />
        </div>
      </div>
      <div className="absolute bottom-0 h-[67dvh] w-full overflow-x-clip bg-white pb-[15px] pt-[20px] max-lg:overflow-y-scroll max-lg:rounded-t-[50px] md:h-[75dvh] md:pb-[30px] md:pt-[20px] lg:relative lg:h-screen lg:w-[50%] lg:pt-0">
        {children}
      </div>
      <div className="min-h-screen w-[50%] bg-[red] bg-white max-lg:hidden">
        <div className="flex h-screen w-full text-white flex-col items-center justify-center rounded-bl-[15%] bg-[red] bg-[url('/assets/auth/bg.png')] bg-cover bg-right font-dmSans text-[100px]">
          <h1 className="max-w-[50%] font-[600] lg:text-[40px] 2xl:text-[65px]">
            <div className="relative aspect-[131/30] w-[45%]">
              <div className="absolute left-0 top-0 -ml-[10px] aspect-[131/30] w-full">
                <Image alt="Pactlock" src="/assets/PactLockLight.png" fill />
              </div>
            </div>
            Seal your Agreements, Trust the Chain.
          </h1>
        </div>
      </div>
    </section>
  );
}
