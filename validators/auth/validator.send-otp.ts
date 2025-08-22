import { z } from "zod";

/**
 * Schema for validating send OTP form.
 *
 * This schema validates the following fields:
 * - `username`: A string that must not be empty. If the username is missing,
 *   the error message "Le nom d'utilisateur est obligatoire" will be shown.
 * - `otp_code`: A string that must be exactly 6 digits. If the code is missing or invalid,
 *   the error message "Le code OTP est obligatoire et doit comporter 6 chiffres" will be shown.
 */
const schemaSendOtp = z.object({
  username: z
    .string()
    .min(1, { message: "Le nom d'utilisateur est obligatoire" }),
  otp_code: z
    .string()
    .regex(/^\d{6}$/, {
      message: "Le code OTP est obligatoire et doit comporter 6 chiffres",
    }),
});
export type SendOtpFormData = z.infer<typeof schemaSendOtp>;

export default schemaSendOtp;
