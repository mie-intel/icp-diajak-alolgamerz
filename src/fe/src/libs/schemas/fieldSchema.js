import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ACCEPTED_IMAGE_SIZE = 500000;

export const AGGREEMENT = ["agree, disagree", "pending"];

export const ITEM_TYPE = ["document", "meeting"];

export const idSchema = z.string();

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

export const publicKeySchema = z.string({ required_error: "Public key must be filled!" });

export const boolSchema = z.boolean();

export const contractsListSchema = z.array(z.string());
