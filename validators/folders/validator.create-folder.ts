import { z } from "zod";

export const createFolderSchema = z.object({
  nom_dossier: z
    .string("Le nom du dossier est requis")
    .min(1, "Le nom du dossier est requis")
    .max(255, "Le nom du dossier ne peut pas dépasser 255 caractères"),
  description: z
    .string()
    .min(1, "La description est requise")
    .max(1000, "La description ne peut pas dépasser 1000 caractères"),
  fichier: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Le fichier est requis")
    .refine(
      (file) => file.size <= 50 * 1024 * 1024,
      "Le fichier ne doit pas dépasser 50 Mo"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Seuls les fichiers PDF sont autorisés"
    ),
  size: z
    .number()
    .min(1, "La taille est requise")
    .max(50 * 1024 * 1024, "La taille ne doit pas dépasser 50 Mo"),
});

export type CreateFolderSchema = z.infer<typeof createFolderSchema>;
