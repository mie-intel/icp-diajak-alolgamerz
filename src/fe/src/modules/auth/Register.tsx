"use client";

import { DashboardBox, DashboardTitle } from "@/components/UI/Dashboard/DashboardBody";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/libs/schemas/auth";
import { z } from "zod";
import { Form, FormCaption, FormInputText, FormSubmit } from "@/components/UI/Form";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  type RegisterFormValues = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      businessName: "",
      contactNumber: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form data:", data);
  };

  return (
    <DashboardBox className="flex items-center justify-center">
      <Form
        className="w-[80%] md:w-[70%] lg:w-[80%] xl:w-[70%] 2xl:w-[56%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DashboardTitle
          title="Create an Account"
          className="w-full text-center text-[20px] font-normal text-black md:mb-[7px] md:text-[30px] lg:mb-[20px] lg:text-left lg:!text-[34px] 2xl:!text-[37px]"
        />
        <FormInputText
          placeholder="example@gmail.com"
          title="Email"
          register={register("email")}
          error={errors?.email}
        />
        <FormInputText
          title="Business Name"
          placeholder="Example Business"
          register={register("businessName")}
          error={errors?.businessName}
        />
        <FormInputText
          title="Contact Number"
          placeholder="+123456789"
          register={register("contactNumber")}
          error={errors?.contactNumber}
        />
        <FormInputText
          title="Password"
          placeholder="Min. 8 characters"
          register={register("password")}
          error={errors?.password}
          hidden
        />
        <FormInputText
          title="Confirm Password"
          placeholder="Re-enter Password"
          register={register("confirm")}
          error={errors?.confirm}
          hidden
        />
        <FormSubmit>Create account</FormSubmit>
        <FormCaption>
          <span>Already have an account?&nbsp;</span>
          <span>
            <Link
              href="/auth/login"
              className="font-[700] text-darkpurple duration-300 hover:text-purple"
            >
              Sign In
            </Link>
          </span>
        </FormCaption>
      </Form>
    </DashboardBox>
  );
}
