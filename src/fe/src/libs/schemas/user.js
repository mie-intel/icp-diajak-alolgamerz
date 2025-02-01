import * as z from "zod";

import {
  boolSchema,
  businessSchema,
  contractsListSchema,
  emailSchema,
  idSchema,
  publicKeySchema,
} from "./fieldSchema";

export const createUserSchema = z.object({
  uId: idSchema,
  bussinessName: businessSchema,
  email: emailSchema,
  publicKey: publicKeySchema,
  isVerified: boolSchema,
  contracts: contractsListSchema,
});
