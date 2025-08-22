import { z } from "zod";

export const SessionTokenSchema = z.object({
  access_token: z.string(),
  expire_at: z.string(),
});
export type SessionToken = z.infer<typeof SessionTokenSchema>;

export const SessionUserDataSchema = z.object({
  id: z.string().nullable(),
  username: z.string(),
  email: z.string().nullable(),
  name: z.string(),
  avatar: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
});
export type SessionUserData = z.infer<typeof SessionUserDataSchema>;

export const SessionUserSchema = z.object({
  data: SessionUserDataSchema,
});
export type SessionUser = z.infer<typeof SessionUserSchema>;

export const SessionSchema = z.object({
  token: SessionTokenSchema,
  user: SessionUserSchema,
});
export type SessionApp = z.infer<typeof SessionSchema>;

export const ApiResponseSchema = z.object({
  data: SessionSchema,
});
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
