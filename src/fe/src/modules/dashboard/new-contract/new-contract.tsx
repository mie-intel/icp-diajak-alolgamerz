"use client";

import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
import { DashboardBox, DashboardSuperTitle } from "@/components/UI/Dashboard/DashboardBody";
import { zodResolver } from "@hookform/resolvers/zod";
import { newContractSchema } from "@/libs/schemas/contracts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormInputText, FormTextArea, FormSubmit } from "@/components/UI/Form";

export default function NewContract() {
  type NewContractValues = z.infer<typeof newContractSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewContractValues>({
    resolver: zodResolver(newContractSchema),
    defaultValues: {
      contractName: "",
      partiesList: [],
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
          {/* <DashboardSuperTitle title="Add new Item" className="!mt-0" /> */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInputText
              placeholder="Example Contract Name"
              title="Contract Name"
              register={register("contractName")}
              error={errors?.contractName}
            />
            <FormInputText
              title="Parties"
              placeholder="Enter parties name, separated by comma (,)"
              register={register("partiesList")}
              error={errors?.partiesList}
            />
            <FormTextArea
              title="Contract Description"
              placeholder="Enter text"
              rows={7}
              register={register("contractDescription")}
              error={errors?.contractDescription}
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
