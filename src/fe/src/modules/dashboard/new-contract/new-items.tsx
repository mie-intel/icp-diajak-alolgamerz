"use client";

import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import { DashboardBox, DashboardSuperTitle } from "@/components/UI/Dashboard/DashboardBody";
import { zodResolver } from "@hookform/resolvers/zod";
import { newContractSchema } from "@/libs/schemas/contracts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormInputText, FormTextArea, FormSubmit, FormSelect } from "@/components/UI/Form";

export default function NewItems() {
  type NewContractValues = z.infer<typeof newContractSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewContractValues>({
    resolver: zodResolver(newContractSchema),
    defaultValues: {
      contractName: "",
      partiesList: "",
      itemType: "Document",
      contractDescription: "",
    },
  });

  const onSubmit = (data: NewContractValues) => {
    console.log("Form data:", data);
  };

  return (
    <>
      <DashboardHeader />
      <DashboardBox>
        <DashboardBox className="flex flex-col items-center lg:!w-[60%] xl:!w-[47%] 2xl:!w-[40%]">
          <DashboardSuperTitle title="Add new Item" className="!mt-0" />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInputText
              placeholder="Example Contract Name"
              title="Item name"
              register={register("contractName")}
              error={errors?.contractName}
            />
            <FormSelect
              title="Choose an Option"
              placeholder="Select..."
              options={["Arya1", "Arya2", "Arya3"]}
              name="Item Type" // Field name
              register={register("itemType", {
                required: "This field is required", // Validation rule
              })}
              error={errors.itemType} // Pass error object
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
