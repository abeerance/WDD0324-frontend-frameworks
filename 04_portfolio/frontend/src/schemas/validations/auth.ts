import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Please enter your username"),
  password: z.string().min(3, "Please enter your password"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
