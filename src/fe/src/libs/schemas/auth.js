import { z } from "zod";
import { businessSchema, emailSchema, passwordSchema, phoneSchema } from "./fieldSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  businessName: businessSchema,
  contactNumber: phoneSchema,
  password: passwordSchema,
  confirm: passwordSchema,
});
