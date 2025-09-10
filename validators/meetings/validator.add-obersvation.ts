import { z } from "zod";

export const addObservationSchema = z.object({
  meetingId: z.string(),
  content: z.string().min(1, "Le contenu de l'observation est requis"),
});
export type AddObservation = z.infer<typeof addObservationSchema>;
