import { z } from "zod";

/**
 * Schema for validating request OTP form.
 *
 * This schema validates the following fields:
 * - `username`: A string that must not be empty. If the username is missing,
 *   the error message "Le nom d'utilisateur est obligatoire" will be shown.
 */
const shemaRequestOtp = z.object({
  username: z
    .string()
    .min(1, { message: "Le nom d'utilisateur est obligatoire" }),
});
export type RequestOtpFormData = z.infer<typeof shemaRequestOtp>;

export default shemaRequestOtp;
