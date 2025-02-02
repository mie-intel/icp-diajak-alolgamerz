import { cn } from "@/libs/utils";

export function Button1({ className = "", children = "Submit", outline = false, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "relative mt-[26px] flex w-full items-center justify-center rounded-2xl p-[13px] text-[10px] font-[700] duration-300 md:mt-[37px] md:p-[18px] md:text-[14px] lg:mt-[44px] xl:text-[18px] 2xl:rounded-3xl",
        outline
          ? "border-[1px] border-darkpurple bg-white text-darkpurple hover:border-white hover:bg-lightpurple hover:text-white md:border-[2px]"
          : "bg-darkpurple text-white hover:bg-lightpurple",
        className,
      )}
      children={children}
      {...props}
    />
  );
}
