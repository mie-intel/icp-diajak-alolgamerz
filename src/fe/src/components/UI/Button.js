"use client";

import { useForm, Controller } from "react-hook-form";
import { cn } from "@/libs/utils";
// import { DropdownMenu } from "radix-ui";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/UI/dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

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

export const ButtonDropDown = ({ control, name, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>{field.value || "Select an option"}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => field.onChange("Edit")} shortcut="⌘ E">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => field.onChange("Duplicate")} shortcut="⌘ D">
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => field.onChange("Archive")} shortcut="⌘ N">
              Archive
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => field.onChange("Move to project…")}>
                  Move to project…
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => field.onChange("Move to folder…")}>
                  Move to folder…
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => field.onChange("Advanced options…")}>
                  Advanced options…
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
};

export default function FormWithDropdown() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ButtonDropDown control={control} name="dropdownOption" />
      <Button1 type="submit">Submit</Button1>
    </form>
  );
}
