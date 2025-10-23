import { platforms } from "@/utils/platforms"
import z from "zod"

export const signUpschema = z
  .object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    birthdate: z.date().optional(),
    preferredPlatform: z.enum(platforms.map((p) => p.label)),
    showPassword: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const signInschema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: "Must have 8 characters" }),
  showPassword: z.boolean().default(false),
})

export type SignInData = z.infer<typeof signInschema>
export type SignUpData = z.infer<typeof signUpschema>
