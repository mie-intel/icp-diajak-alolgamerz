"use client";

import { DashboardBox, DashboardTitle } from "@/components/UI/Dashboard/DashboardBody";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/libs/schemas/auth";
import { z } from "zod";
import { Form, FormCaption, FormInputText, FormSubmit } from "@/components/UI/Form";
import Link from "next/link";
import { login, getPrincipal } from "@/libs/identity";
import { myaxios } from "@/libs/myaxios";

export default function Login() {
  const router = useRouter();
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

  const onSubmit = async (data: LoginFormValues) => {
    let principal, payload;
    try {
      principal = await getPrincipal();
      payload = {
        principal: principal.toString()
      }
    } catch (err) {
      await login(() => {window.location.reload();});
      return ;
    }

    try {
      const resp = await myaxios.post(process.env.NEXT_PUBLIC_BASE_URL+"/account/login", payload);
      localStorage.setItem("session", `Bearer ${resp.data.session}`);
      myaxios.defaults.headers.common["Authorization"] = `Bearer ${resp.data.session}`;
      router.push("/dashboard/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardBox className="flex items-center justify-center">
      <Form
        className="w-[80%] md:w-[70%] lg:w-[80%] xl:w-[70%] 2xl:w-[58%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DashboardTitle
          title="Sign In"
          className="w-full text-center text-[20px] font-normal text-black md:mb-[7px] md:text-[30px] lg:mb-[20px] lg:text-left lg:!text-[34px] 2xl:!text-[37px]"
        />
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
        <FormSubmit>Sign In</FormSubmit>
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
