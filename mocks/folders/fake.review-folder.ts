import { ListReviewFolderSchema } from "@/validators/folders/validator.review-folder";

export const fakeReviewFolder: ListReviewFolderSchema = {
  data: [
    {
      id: "review-1",
      commentaire:
        "Excellent travail sur ce dossier. Tous les documents sont bien organisés et les analyses sont pertinentes.",
      user: {
        id: "user-1",
        name: "Jean Dupont",
      },
      date: "2024-01-15 14:30:25",
    },
    {
      id: "review-2",
      commentaire:
        "Le dossier est complet mais il manque quelques détails dans la section technique. À revoir.",
      user: {
        id: "user-2",
        name: "Marie Martin",
      },
      date: "2024-01-16 09:15:42",
    },
    {
      id: "review-3",
      commentaire:
        "Très bon travail ! Les recommandations sont claires et bien argumentées.",
      user: {
        id: "user-3",
        name: "Pierre Durand",
      },
      date: "2024-01-17 16:45:18",
    },
    {
      id: "review-4",
      commentaire:
        "Le dossier répond parfaitement aux exigences. Je valide la version finale.",
      user: {
        id: "user-4",
        name: "Sophie Bernard",
      },
      date: "2024-01-18 11:20:33",
    },
  ],
};
