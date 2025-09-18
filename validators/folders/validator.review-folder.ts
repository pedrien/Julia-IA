import { z } from "zod";

export const reviewFolderSchema = z.object({
  id: z.string(),
  commentaire: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
  }),
  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      "Date must be in format YYYY-MM-DD HH:MM:SS"
    ),
});

export type ReviewFolderSchema = z.infer<typeof reviewFolderSchema>;

export const listReviewFolderSchema = z.object({
  data: z.array(reviewFolderSchema),
});

export type ListReviewFolderSchema = z.infer<typeof listReviewFolderSchema>;
