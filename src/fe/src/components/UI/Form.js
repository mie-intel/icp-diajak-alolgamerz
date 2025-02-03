"use client";

import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useController } from "react-hook-form";
import { cn } from "@/libs/utils";
import "./form.css";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function Form({ className = "", ...props }) {
  return <form className={cn("flex w-full flex-col bg-inherit", className)} {...props} />;
}

export function FormInputText({
  className = "",
  title = "",
  placeholder = "",
  hidden = false,
  error = null,
  register,
}) {
  const [isClient, setIsClient] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleShowHidden = () => {
    if (!hidden) return;
    setShowHidden(!showHidden);
  };
  return (
    <>
      <div
        className={cn(
          "relative mt-[10px] flex w-full flex-col font-dmSans md:mt-[18px]",
          className,
        )}
      >
        {title && <h3 className="text-[10px] text-black md:text-[13px] xl:text-[17px]">{title}</h3>}
        <div
          className={cn(
            "relative mt-[5px] flex w-full flex-row items-center overflow-clip rounded-2xl bg-grey pr-[7px] md:mt-[8px] md:pr-[13px] lg:mt-[11px] xl:pr-[18px] 2xl:rounded-3xl",
          )}
        >
          <input
            {...register}
            type={hidden && !showHidden ? "password" : "text"}
            placeholder={placeholder}
            className="relative h-full w-full bg-inherit p-[13px] font-dmSansRegular text-[10px] text-black outline-0 max-md:px-[16px] md:p-[18px] md:text-[14px] xl:text-[18px]"
          />
          {isClient && hidden && (
            <button
              type="button"
              onClick={handleShowHidden}
              className="aspect-[1/1] w-[25px] text-lightpurple hover:text-purple"
            >
              {showHidden ? (
                <AiFillEye className="h-full w-full" />
              ) : (
                <AiFillEyeInvisible className="h-full w-full" />
              )}
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  );
}

export function FormTextArea({
  className = "",
  title = "",
  placeholder = "",
  rows = 5,
  error = null,
  register,
}) {
  return (
    <>
      <div
        className={cn(
          "relative mt-[10px] flex w-full flex-col font-dmSans md:mt-[18px]",
          className,
        )}
      >
        {title && <h3 className="text-[10px] text-black md:text-[13px] xl:text-[17px]">{title}</h3>}
        <div
          className={cn(
            "relative mt-[5px] flex w-full flex-row items-center overflow-clip rounded-2xl bg-grey pr-[7px] md:mt-[8px] md:pr-[13px] lg:mt-[11px] xl:pr-[18px] 2xl:rounded-3xl",
          )}
        >
          <textarea
            {...register}
            placeholder={placeholder}
            rows={rows}
            className="relative h-full w-full bg-inherit p-[13px] font-dmSansRegular text-[10px] text-black outline-0 max-md:px-[16px] md:p-[18px] md:text-[14px] xl:text-[18px]"
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  );
}
export function FormSelect({
  className = "",
  options = [],
  placeholder = "Select...",
  outline = false,
  name = "",
  control = null,
  rules = null,
  error,
  title,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false); // Control the open state
  const [selectedValue, setSelectedValue] = useState("");

  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: "", // Important: Set default value here
  });

  useEffect(() => {
    if (field.value) {
      setSelectedValue(field.value);
    }
  }, [field.value]);

  const handleSelect = (item) => {
    setSelectedValue(item);
    field.onChange(item);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div
      className={cn("relative mt-[10px] flex w-full flex-col font-dmSans md:mt-[18px]", className)}
    >
      {title && <h3 className="text-[10px] text-black md:text-[13px] xl:text-[17px]">{title}</h3>}
      <div
        className={cn(
          "relative mt-[5px] flex w-full items-center justify-center rounded-2xl p-[13px] text-[10px] font-[700] duration-300 md:mt-[8px] md:p-[18px] md:text-[14px] lg:mt-[11px] xl:text-[18px] 2xl:rounded-3xl",
          outline
            ? "border-[1px] border-darkpurple bg-white text-darkpurple hover:border-white hover:bg-lightpurple hover:text-white md:border-[2px]"
            : "bg-grey text-white hover:bg-lightpurple",
        )}
        {...props}
      >
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          {/* Control the open state */}
          <DropdownMenuTrigger
            className="group w-full text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Toggle on click */}
            <div className="flex justify-between">
              <span className="truncate font-[500] text-black">{selectedValue || placeholder}</span>{" "}
              <ChevronDownIcon className="h-5 w-5 text-gray-500 duration-300 group-focus:rotate-[180deg]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] duration-300">
            {options.map((item) => (
              <DropdownMenuItem key={item} onSelect={() => handleSelect(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {error && <span className="mt-1 text-sm text-red-500">{error.message}</span>}
    </div>
  );
}
export function FormSelectMultiple({
  // Renamed to FormSelectMultiple
  className = "",
  options = [],
  placeholder = "Select...",
  outline = false,
  name = "",
  control = null,
  rules = null,
  error,
  title,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  useEffect(() => {
    if (field.value && Array.isArray(field.value)) {
      // Check if field.value is an array
      setSelectedValues(field.value);
    }
  }, [field.value]);

  const handleSelect = (item) => {
    const isSelected = selectedValues.includes(item);
    const newSelectedValues = isSelected
      ? selectedValues.filter((val) => val !== item)
      : [...selectedValues, item];

    setSelectedValues(newSelectedValues); // Update local state FIRST

    // Use the newSelectedValues directly in field.onChange
    field.onChange(newSelectedValues); // Directly pass the array
  };

  const formatSelectedValues = () => {
    return selectedValues.length > 0 ? selectedValues.join(", ") : placeholder;
  };

  return (
    <div
      className={cn("relative mt-[10px] flex w-full flex-col font-dmSans md:mt-[18px]", className)}
    >
      {title && <h3 className="text-[10px] text-black md:text-[13px] xl:text-[17px]">{title}</h3>}
      <div
        className={cn(
          "relative mt-[5px] flex w-full items-center justify-center rounded-2xl p-[13px] text-[10px] font-[700] duration-300 md:mt-[8px] md:p-[18px] md:text-[14px] lg:mt-[11px] xl:text-[18px] 2xl:rounded-3xl",
          outline
            ? "border-[1px] border-darkpurple bg-white text-darkpurple hover:border-white hover:bg-lightpurple hover:text-white md:border-[2px]"
            : "bg-grey text-white hover:bg-lightpurple",
        )}
        {...props}
      >
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            className="group w-full text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center justify-between">
              <span className="truncate font-[500] text-black">{formatSelectedValues()}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-500 duration-300 group-focus:rotate-[180deg]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] duration-300">
            {options.map((item) => (
              <DropdownMenuItem key={item} onSelect={() => handleSelect(item)}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(item)}
                    onChange={() => handleSelect(item)} // The crucial fix!
                    className="mr-2"
                  />
                  <span>{item}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {error && <span className="mt-1 text-sm text-red-500">{error.message}</span>}
    </div>
  );
}

export function FormFiles({ className = "", title = "", error = null, register }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Basic file presence check.  Add more validation if needed.
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Please select a file.");
    }
  };

  return (
    <div
      className={cn(
        "relative mt-[10px] flex w-full flex-col overflow-clip font-dmSans md:mt-[18px]",
        className,
      )}
    >
      {title && <h3 className="text-[10px] text-black md:text-[13px] xl:text-[17px]">{title}</h3>}
      <div
        className={cn(
          "relative mt-[5px] flex w-full items-center overflow-clip rounded-2xl bg-grey pr-[7px] md:mt-[8px] md:pr-[13px] lg:mt-[11px] xl:pr-[18px] 2xl:rounded-3xl",
        )}
      >
        <input
          type="file"
          {...register} // Integrate with react-hook-form
          onChange={handleFileChange}
          className={cn(
            "relative h-full w-full cursor-pointer bg-inherit p-[13px] font-dmSansRegular text-[10px] text-black outline-0 max-md:px-[16px] md:p-[18px] md:text-[14px] xl:text-[18px]",
          )} // Style the input
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {error && <p className="text-red-500">{error.message}</p>} {/* Error from react-hook-form */}
    </div>
  );
}

export function FormDates({ className = "", title = "", error = null, register }) {
  return (
    <div
      className={cn("relative mt-[10px] flex w-full flex-col font-dmSans md:mt-[18px]", className)}
    >
      {title && <h3 className="text-[10px] text-black md:text-[13px] xl:text-[17px]">{title}</h3>}
      <div
        className={cn(
          "relative mt-[5px] flex w-full items-center overflow-clip rounded-2xl bg-grey pr-[7px] md:mt-[8px] md:pr-[13px] lg:mt-[11px] xl:pr-[18px] 2xl:rounded-3xl",
        )}
      >
        <input
          type="date"
          {...register} // Integrate with react-hook-form
          className={cn(
            "relative h-full w-full overflow-clip bg-inherit p-[13px] font-dmSansRegular text-[10px] text-black outline-0 max-md:px-[16px] md:p-[18px] md:text-[14px] xl:text-[18px]",
          )}
        />
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}

export function FormSubmit({ className = "", children = "Submit", outline = false, ...props }) {
  return (
    <button
      type="submit"
      className={cn(
        "relative mt-[26px] flex w-full items-center justify-center rounded-2xl p-[13px] text-[10px] font-[700] duration-300 md:mt-[37px] md:p-[18px] md:text-[14px] lg:mt-[44px] xl:text-[18px] 2xl:rounded-3xl",
        outline
          ? "border-[1px] border-darkpurple bg-white text-darkpurple hover:border-white hover:bg-lightpurple hover:text-white md:border-[2px]"
          : "bg-darkpurple text-white hover:bg-lightpurple",
        className,
      )}
      {...props} // Spread props FIRST
      children={children} // Then set children (won't be overridden)
    />
  );
}
export function FormCaption({ className = "", ...props }) {
  return (
    <div
      className={cn(
        "relative mt-[20px] flex w-full items-center rounded-lg text-[10px] text-black md:mt-[27px] md:rounded-xl md:text-[14px] lg:mt-[32px] xl:rounded-2xl xl:text-[18px] 2xl:rounded-3xl",
        className,
      )}
      {...props}
    />
  );
}
