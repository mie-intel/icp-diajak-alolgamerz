import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ required_error: "Username harus diisi." }),
  password: z.string({ required_error: "Password harus diisi." }),
});
