// import {
//   DashboardBox,
//   DashboardData,
//   DashboardSectionTitle,
//   DashboardTitle,
//   LineVertical,
// } from "@/components/UI/Dashboard/DashboardBody";
// import { Button1 } from "@/components/UI/Button";
// import { DashboardHeader } from "@/components/UI/Dashboard/DashboardSkeleton";
// import { createUserSchema } from "@/libs/schemas/user";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Form, FormSubmit } from "@/components/UI/Form";

// export default function EditAccount({
//   account = {
//     businessName: "Radhya Bebek",
//     email: "example@gmail.com",
//     publicKey: "10134jfa",
//     isVerified: "verified",
//   },
// }) {
//   type EditAccountValues = z.infer<typeof createUserSchema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<EditAccountValues>({
//     resolver: zodResolver(createUserSchema),
//     defaultValues: {
//       email: "",
//       businessName: "",
//       isVerified: false,
//       contracts: [],
//     },
//   });

//   const onSubmit = (data: EditAccountValues) => {
//     console.log("Form data:", data);
//   };

//   return (
//     <>
//       <DashboardBox className="text-darkpurple">
//         <Form
//           onSubmit={handleSubmit(onSubmit)}
//           className="relative flex h-full w-full items-center justify-around px-[3vw] md:px-[5vw] lg:px-0"
//         >
//           <DashboardBox className="w-[40%] self-center md:w-[40%] lg:w-[20%]">
//             <DashboardSectionTitle title="Account Details" />
//             {/* <DashboardData title="Account Name" isi={account.businessName} /> */}
//             {/* <DashboardData title="Email" isi={account.email} /> */}
//             {/* <DashboardData title="Password" isi={account.password} hidden /> */}
//             <DashboardData title="Public Key" isi={account.publicKey} />
//             {/* <DashboardData title="Account Status" isi={account.isVerified} verified /> */}
//             <FormSubmit>Commit Changes</Form>
//             <Button1 className="w-[50%] self-end md:w-[40%] lg:w-[30%]" outline>
//               Edit
//             </Button1>
//           </DashboardBox>
//           {/* <LineVertical className={"h-full self-center"} /> */}
//           {/* <DashboardBox className="flex w-[70%] flex-col md:w-[70%] lg:w-[60%]">
//             <DashboardTitle title="Business Profile" />
//             <DashboardData title="Name" isi={account.businessName} />
//             <DashboardData title="Description" isi={account.description} />
//             <DashboardSectionTitle title="Contact" />
//             <DashboardData title="Email" isi={account.email} />
//             <DashboardData title="Phone Number" isi={account.phoneNumber} />
//           </DashboardBox> */}
//         </Form>
//       </DashboardBox>
//     </>
//   );
// }
