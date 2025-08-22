import { z } from "zod";

/**
 * Schema for validating the forgot password request.
 *
 * This schema ensures that the email field is a valid email address.
 *
 * @example
 * const validData = { email: "example@example.com" };
 * const result = forgotPasswordSchema.safeParse(validData);
 * if (result.success) {
 *   // validData is valid
 * } else {
 *   // result.error contains validation errors
 * }
 *
 * @property {string} email - The email address of the user requesting password reset.
 * @throws Will throw an error if the email is not a valid email address.
 */
export const shemaForgotPassword = z.object({
  email: z.string().email({ message: "L'adresse email est invalide" }),
});

export type ForgotPasswordFormData = z.infer<typeof shemaForgotPassword>;
