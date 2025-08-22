import { ZodType, ZodError } from "zod";

export function validateRequestBody<T>(body: unknown, schema: ZodType<T>): T {
  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues
        .map((err) => `${err.path.join(".")} : ${err.message}`)
        .join(", ");
      throw new Error(` ${errorMessages}`);
    }
    throw error;
  }
}
