"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { newItemSchema } from "@/libs/schemas/contracts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormInputText,
  FormTextArea, // If you're using text areas
  FormSelectMultiple,
  FormSubmit,
  FormSelect,
  FormFiles, // Import FormFiles
  FormDates, // Import FormDates
} from "@/components/UI/Form";
import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import {
  DashboardBox,
  DashboardSectionTitle,
  DashboardSuperTitle,
} from "@/components/UI/Dashboard/DashboardBody";

export default function NewItems() {
  type newItemValues = z.infer<typeof newItemSchema>;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<newItemValues>({
    resolver: zodResolver(newItemSchema),
    defaultValues: {
      contractName: "", // Keep default values empty or appropriate
      partiesList: [],
      itemType: "document",
      filesContract: null, // Default for files should be null
      isoDateContract: "", // Or a default date string if needed
    },
  });

  const onSubmit = (data: newItemValues, e) => {
    e.preventDefault();
    console.log("Form data:", data); // Log the data
    try {
      alert(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <>
      <DashboardHeader />
      <DashboardBox>
        <DashboardBox className="flex flex-col items-center lg:!w-[60%] xl:!w-[47%] 2xl:!w-[40%]">
          <DashboardSuperTitle title="Add new Item" className="!mt-0" />
          <Form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            {/* Removed onInvalid */}
            <FormInputText
              placeholder="Example Contract Name"
              title="Item name"
              register={register("contractName")}
              error={errors?.contractName}
            />
            <FormSelect
              title="Item Type"
              placeholder="Select..."
              options={["document", "meeting"]}
              name="itemType"
              control={control}
              rules={{ required: "This field is required" }}
              error={errors?.itemType}
            />
            <FormSelectMultiple
              title="Parties List"
              placeholder="Select..."
              options={["Item 1", "Item 2", "Item 3", "Item 4"]}
              name="partiesList"
              control={control}
              rules={{ required: "This field is required" }}
              error={errors?.partiesList}
            />
            <FormFiles // Use FormFiles component
              title="Contract File"
              register={register("filesContract")}
              error={errors?.filesContract}
            />
            <DashboardSectionTitle title="or (choose one)" />
            <FormDates // Use FormDates component
              title="Contract Date"
              register={register("isoDateContract")}
              error={errors?.isoDateContract}
            />
            <FormSubmit className="w-full lg:w-[45%]" outline>
              Create Contract
            </FormSubmit>
          </Form>
        </DashboardBox>
      </DashboardBox>
    </>
  );
}
