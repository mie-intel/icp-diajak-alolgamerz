import { cn } from "@/libs/utils";

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export const LabelStatus = ({ status = "accepted" }) => {
  const statusConfig = {
    declined: {
      bordercolor: "border-[#F73639]",
      textcolor: "text-[#F73639]",
    },
    pending: {
      bordercolor: "border-[#E1BF00]",
      textcolor: "text-[#F73639]",
    },
    accepted: {
      bordercolor: "border-[#44BB1D]",
      textcolor: "text-[#44BB1D]",
    },
  };
  const selected = statusConfig[status];
  return (
    <>
      <span
        className={cn(
          "relative flex w-[150px] items-center justify-center self-center rounded-2xl px-[13px] py-[3px] text-[10px] font-[700] duration-300 md:px-[18px] md:text-[14px] xl:text-[18px] 2xl:rounded-3xl",
          "border-[1px] border-darkpurple bg-white font-[500] capitalize text-darkpurple md:border-[2px]",
          selected ? selected.bordercolor : "border-0 border-transparent",
          selected ? selected.textcolor : "text-transparent",
        )}
      >
        {status}
      </span>
    </>
  );
};

export function ButtonCommit({ action = "accept", ...props }) {
  const color = {
    accept: "bg-[#44BB1D] hover:bg-[green]",
    decline: "bg-[#F73639] hover:bg-[darkred]",
  };
  const icon = {
    accept: <AiOutlineCheck className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />,
    decline: <AiOutlineClose className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />,
  };
  return (
    <button
      className={cn(
        "rounded-3xl px-[12px] py-[3px] text-[8px] capitalize text-black text-white duration-300 md:px-[18px] md:py-[3px] md:text-[14px] lg:px-[24px] lg:py-[6px] xl:text-[18px]",
        color[action] && color[action],
      )}
      {...props}
    >
      <div className="flex items-center justify-evenly gap-[10px]">
        <span className="transition-all duration-300 group-hover:underline">{action}</span>
        {icon[action] && icon[action]}
      </div>
    </button>
  );
}
