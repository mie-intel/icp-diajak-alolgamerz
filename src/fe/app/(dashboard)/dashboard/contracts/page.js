"use client";

import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";
import { DashboardData } from "@/components/UI/Dashboard/DashboardBody";
import { DashboardDataInput } from "../../../../src/components/UI/Dashboard/DashboardBody";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/libs/schemas";
import { Form, FormInputText, FormSubmit } from "@/components/UI/Form";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm <
  RegisterFormValues >
  {
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      bussinessName: "",
      contactNumber: "",
      password: "",
      confirm: "",
    },
  };
  const formData = watch();
  return (
    <DashboardBox className={"w-full"}>
      <Form className="w-[45%]">
        <FormInputText
          title="Label"
          register={{ ...register("firstName", { required: true }) }}
          hidden
        />
        <FormInputText title="Label" register={{ ...register("lastName", { required: true }) }} />
        <FormSubmit>Register</FormSubmit>
      </Form>
      {/* <pre>{JSON.stringify(formData)}</pre> */}
    </DashboardBox>
  );
}
