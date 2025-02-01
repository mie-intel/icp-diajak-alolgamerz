"use client";

import {
  DashboardBox,
  DashboardData,
  DashboardHeading,
  DashboardSectionTitle,
  DashboardTitle,
} from "@/components/UI/Dashboard/DashboardBody";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setData(e.value);
  };
  return (
    // <DashboardBox className="flex w-[30%] flex-col">
    //   <DashboardTitle title="Bussiness Profile" />
    //   <DashboardHeading title="Account Details" />
    //   <DashboardSectionTitle title="Account Details" />
    //   <DashboardData title="Bussiness Name" isi={<>Example Business Name</>} />
    //   <DashboardData title="Email" isi={<>example@email.com</>} verified />
    //   <DashboardData title="Password" isi={"Ini rahasia"} hidden />
    //   <DashboardData title="Public Key" isi={"105D38HKSD"} />
    //   <DashboardData title="Account Status" isi="Verified" verified />
    // </DashboardBox>
    <form onSubmit={handleSubmit}>
      <input name="Polikarpus" />
      <button type="submit">Submit</button>
    </form>
  );
}
