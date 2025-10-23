import { platforms } from "@/utils/platforms"
import z from "zod"

export const signUpschema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  birthdate: z.iso.date(),
  preferredPlatform: z.enum(platforms.map((p) => p.label)),
})

export const signInschema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: "Must have 8 characters" }),
  showPassword: z.boolean().default(false),
})

export type SignInData = z.infer<typeof signInschema>
export type SignUpData = z.infer<typeof signUpschema>
