import { ZodType } from "zod";
import "server-only";
import { ENV } from "@/env";

const DEFAULT_VALIDATION_ERROR = "Une erreur de validation est survenue.";

/**
 * Validates an API response against a specified Zod schema.
 *
 * This function takes in an unknown data type, validates it against the provided schema,
 * and returns the parsed data if it passes validation. If the data is invalid, it throws an error.
 *
 * @template T - The type that the schema expects the data to conform to.
 * @param {unknown} data - The data to be validated, typically from an API response.
 * @param {ZodSchema<T>} schema - The Zod schema used for validating the data.
 * @returns {T} - The validated and parsed data.
 * @throws {Error} If the data fails to validate, an error is thrown with a descriptive message.
 *
 * @example
 * const schema = z.object({ name: z.string(), age: z.number() });
 * const data = { name: "Alice", age: 30 };
 * try {
 *   const validatedData = validateApiResponse(data, schema);
 *   console.log(validatedData);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export function validateApiResponse<T>(data: unknown, schema: ZodType<T>): T {
  const parsedData = schema.safeParse(data);
  if (!parsedData.success) {
    const errorMessage =
      ENV.APP_ENV === "development"
        ? `Invalid API response: ${parsedData.error.message}`
        : DEFAULT_VALIDATION_ERROR;
    throw new Error(errorMessage);
  }
  return parsedData.data;
}
