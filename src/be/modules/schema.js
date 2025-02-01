import { z } from "zod";
export const registerBodySchema = z.object({
    businessName: z.string(),
    email: z.string().email(),
    principal: z.string()
}).required().strict();

export const loginBodySchema = z.object({
    principal: z.string()
}).required().strict();

export const contractsBodySchema = z.object({
    contractName: z.string(),
	contractDescription: z.string(),
	contractParties: z.number().array().nonempty()

}).required().strict();

// "pending" is omitted
const MOD_AGREEMENT = ["agree", "disagree"];
export const contractsIDBodySchema = z.object({
    state: z.enum(MOD_AGREEMENT),
    keyExchange: z.tuple([
        z.string().base64(),
        z.string().base64()
    ])
}).required().strict();


export const itemBodySchema = z.union([z.object({
    title: z.string(),
	description: z.string(),
    parties: z.number().array().nonempty(),
    type: z.enum(["document"]),
	fileBlob: z.string().base64(),
}).required().strict(),
z.object({
    title: z.string(),
	description: z.string(),
    parties: z.number().array().nonempty(),
    type: z.enum(["meeting"]),
	meetingDate: z.string().datetime()
}).required().strict()]);

export const itemIDBodySchema = z.object({
    state: z.enum(MOD_AGREEMENT)
}).required().strict();