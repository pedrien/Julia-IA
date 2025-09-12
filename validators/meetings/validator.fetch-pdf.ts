import { z } from "zod";

export const fetchPdfRequestSchema = z.object({
  url: z.url("URL du PDF invalide"),
});

export type FetchPdfRequest = z.infer<typeof fetchPdfRequestSchema>;
