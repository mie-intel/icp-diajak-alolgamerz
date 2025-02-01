"use client";

import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/libs/schemas/auth";
import { z } from "zod";
import { Form, FormCaption, FormInputText, FormSubmit } from "@/components/UI/Form";
import Link from "next/link";

export default function Login() {
  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form data:", data);
  };

  return (
    <DashboardBox className="flex items-center justify-center">
      <Form className="w-[56%]" onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          placeholder="example@gmail.com"
          title="Email"
          register={register("email")}
          error={errors?.email}
        />
        <FormInputText
          title="Password"
          placeholder="Min. 8 characters"
          register={register("password")}
          error={errors?.password}
          hidden
        />
        <FormSubmit>Create account</FormSubmit>
        <FormCaption>
          <span>Not registered yet?&nbsp;</span>
          <span>
            <Link
              href="/auth/register"
              className="font-[700] text-darkpurple duration-300 hover:text-purple"
            >
              Create an account
            </Link>
          </span>
        </FormCaption>
      </Form>
    </DashboardBox>
  );
}
