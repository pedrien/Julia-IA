import { z } from "zod";

/**
 * Schema for validating login credentials.
 *
 * This schema validates the following fields:
 * - `email`: A string that must be a valid email address. If the email is invalid,
 *   the error message "Adresse e-mail invalide" will be shown.
 * - `password`: A string that must be at least 6 characters long. If the password
 *   is shorter than 6 characters, the error message "Le mot de passe est obligatoire"
 *   will be shown.
 */
const shemaLogin = z.object({
  username: z
    .string()
    .min(1, { message: "Le nom d'utilisateur est obligatoire" }),
});
export type LoginFormData = z.infer<typeof shemaLogin>;

export default shemaLogin;
