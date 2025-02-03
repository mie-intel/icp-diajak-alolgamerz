import { z } from "zod";
export const registerBodySchema = z.object({
    businessName: z.string(),
    email: z.string().email(),
    principal: z.string()
}).strict();

export const loginBodySchema = z.object({
    principal: z.string()
}).strict();

export const proofBodySchema = z.object({
    fileBlob: z.string().base64(),
    parties: z.number().array().nonempty(),
    hash: z.string()
}).strict();

export const contractsBodySchema = z.object({
    contractName: z.string(),
	contractDescription: z.string(),
	contractParties: z.number().array().nonempty()

}).strict();

// "pending" is omitted
const MOD_AGREEMENT = ["agree", "disagree"];
export const contractsIDBodySchema = z.object({
    state: z.enum(MOD_AGREEMENT),
    keyExchange: z.tuple([
        z.string().base64(),
        z.string().base64()
    ])
}).strict();


export const itemBodySchema = z.union([z.object({
    title: z.string(),
	description: z.string(),
    parties: z.number().array().nonempty(),
    type: z.enum(["document"]),
    fileName: z.string(),
	fileBlob: z.string().base64(),
}).strict(),
z.object({
    title: z.string(),
	description: z.string(),
    parties: z.number().array().nonempty(),
    type: z.enum(["meeting"]),
	meetingDate: z.string().datetime()
}).strict()]);

export const itemIDBodySchema = z.object({
    state: z.enum(MOD_AGREEMENT)
}).strict();

export const meetingBodySchema = z.object({
    meetingFileID: z.object({
        uID: z.number(),
        id: z.string(),
        hash: z.string().base64()
    }).strict().array().nonempty()
}).strict();