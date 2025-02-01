import * as z from "zod";
import { boolSchema, businessSchema, idSchema } from "./fieldSchema";

export const createContractsSchema = z.object({
  cID: idSchema,
  contractName: businessSchema,
  isFinalised: boolSchema,
  lastModified: z.string(),
});
