import * as z from "zod";
import {
  boolSchema,
  businessSchema,
  descriptionSchema,
  idSchema,
  ITEM_TYPE,
  namaSchema,
  partiesListSchema,
} from "./fieldSchema";

export const newContractSchema = z.object({
  contractName: namaSchema,
  itemType: z.enum(ITEM_TYPE),
  partiesList: partiesListSchema,
  contractDescription: descriptionSchema,
});

export const createContractsSchema = z.object({
  cID: idSchema,
  contractName: businessSchema,
  isFinalised: boolSchema,
  lastModified: z.string(),
});
