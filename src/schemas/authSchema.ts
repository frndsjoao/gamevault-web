import { platforms } from "@/utils/platforms"
import z from "zod"

export const signUpschema = z
  .object({
    name: z.string({ error: "Name is required" }).min(1),
    email: z.email({ error: "Email is required" }),
    password: z.string({ error: "Password is required" }).min(6),
    confirmPassword: z.string({ error: "Confirm your password" }),
    birthdate: z.date().optional(),
    preferredPlatform: z.enum(platforms.map((p) => p.id)),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const signInschema = z.object({
  email: z.email(),
  password: z.string().min(6, { error: "Must have 8 characters" }),
  showPassword: z.boolean().default(false),
})

export type SignInData = z.infer<typeof signInschema>
export type SignUpData = z.infer<typeof signUpschema>
