"use client";

import { DashboardBox } from "@/components/UI/Dashboard/DashboardBody";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields },
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      category: "",
      checkbox: [],
      radio: "",
    },
  });
  const formData = watch();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <DashboardBox>
      <form onSubmit={handleSubmit(onSubmit)} className="text-black">
        <input {...register("firstName", { required: true })} placeholder="First name" />

        <input {...register("lastName", { minLength: 2 })} placeholder="Last name" />

        <select {...register("category")}>
          <option value="">Select...</option>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
        </select>

        <input {...register("checkbox")} type="checkbox" value="A" />
        <input {...register("checkbox")} type="checkbox" value="B" />
        <input {...register("checkbox")} type="checkbox" value="C" />

        <input {...register("radio")} type="radio" value="A" />
        <input {...register("radio")} type="radio" value="B" />
        <input {...register("radio")} type="radio" value="C" />

        <input type="submit" />
      </form>
      <pre className="text-black">{JSON.stringify(formData, null, 2)}</pre>
    </DashboardBox>
  );
}
