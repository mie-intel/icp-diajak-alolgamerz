import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ACCEPTED_IMAGE_SIZE = 500000;

export const AGGREEMENT = ["agree, disagree", "pending"];

export const ITEM_TYPE = ["document", "meeting"];

export const idSchema = z.string();

export const fileSchema = z.any(); // For general file uploads.  Refine as needed (see below).

export const dateSchema = z.string().or(z.date()); // Accepts strings or Date objects.  More on this below.

export const namaSchema = z
  .string({ required_error: "Name should be filled!" })
  .min(2, { message: "Name must contain at least 2 characters" })
  .max(50, { message: "Name must contain not more than 50 characters" })
  .refine((nama) => /^[A-Za-z\s,'.-]+$/.test(nama), {
    message: "Name can only contain letters, space, and single quote",
  });

export const businessSchema = z
  .string({ required_error: "Name should be filled!" })
  .min(2, { message: "Name must contain at least 2 characters" })
  .max(50, { message: "Name must not contain more than 50 characters" })
  .refine((name) => /^[A-Za-z0-9\s,'.-]+$/.test(name), {
    message: "Name can only contain alphanumeric characters, spaces, and certain symbols (',.-)",
  });

export const emailSchema = z
  .string({ required_error: "Email must be filled!" })
  .min(2, { message: "Email can not be empty!" })
  .email({ message: "Invalid email address!" });

export const phoneSchema = z
  .string({
    required_error: "Phone number must be filled!.",
  })
  .refine((whatsapp) => /^\+[0-9]{10,15}$/.test(whatsapp), {
    message: "Phone number must be in a valid format, example: +185123456789",
  });

export const passwordSchema = z
  .string({ required_error: "Password must be filled!" })
  .min(8, { message: "Password must be at least 8 characters long!" })
  .max(50, { message: "Password must not be more than 50 characters long!" })
  .refine((password) => /^[A-Za-z0-9]+$/.test(password), {
    message: "Password must contain only alphanumeric characters (letters and numbers)!",
  });

export const descriptionSchema = z
  .string({ required_error: "Description must be filled!" })
  .min(20, { message: "Description: must be at least 20 characters long!" })
  .max(200, { message: "Password must not be more than 200 characters long!" })
  .refine((password) => /^[A-Za-z0-9]+$/.test(password), {
    message: "Description must contain only alphanumeric characters (letters and numbers)!",
  });

export const publicKeySchema = z.string({ required_error: "Public key must be filled!" });

export const partiesListSchema = z.array(z.string());

export const boolSchema = z.boolean();

export const contractsListSchema = z.array(z.string());
