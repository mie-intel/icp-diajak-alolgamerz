import * as z from "zod";
import {
  boolSchema,
  businessSchema,
  dateSchema,
  descriptionSchema,
  fileSchema,
  idSchema,
  ITEM_TYPE,
  namaSchema,
  partiesListSchema,
} from "./fieldSchema";

export const newContractSchema = z.object({
  contractName: namaSchema,
  itemType: z.enum(["document", "meeting"], { message: "Must be these value!" }),
  partiesList: partiesListSchema,
  contractDescription: descriptionSchema,
});

export const newItemSchema = z.object({
  contractName: namaSchema,
  itemType: z.enum(["document", "meeting"], { message: "Must be these value!" }),
  partiesList: partiesListSchema,
  filesContract: fileSchema,
  isoDateContract: dateSchema,
});

export const createContractsSchema = z.object({
  cID: idSchema,
  contractName: businessSchema,
  isFinalised: boolSchema,
  lastModified: z.string(),
});
