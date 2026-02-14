import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
})

export type LoginSchema = z.infer<typeof loginSchema>
