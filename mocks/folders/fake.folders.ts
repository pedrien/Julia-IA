import { ListFolderSchema } from "@/validators/folders/validator.list-folder";

export const fakeFoldersList: ListFolderSchema = {
  data: [
    {
      id: "folder-1",
      status: "EN_COURS",
      name: "Dossier Projet Alpha",
      total_files: 15,
    },
    {
      id: "folder-2",
      status: "TRAITE",
      name: "Dossier Projet Beta",
      total_files: 8,
    },
    {
      id: "folder-3",
      status: "EN_COURS",
      name: "Dossier Documentation",
      total_files: 25,
    },
    {
      id: "folder-4",
      status: "TRAITE",
      name: "Dossier Rapports",
      total_files: 12,
    },
    {
      id: "folder-5",
      status: "EN_COURS",
      name: "Dossier Réunions",
      total_files: 30,
    },
    {
      id: "folder-6",
      status: "TRAITE",
      name: "Dossier Archives",
      total_files: 45,
    },
    {
      id: "folder-7",
      status: "EN_COURS",
      name: "Dossier Formation",
      total_files: 18,
    },
    {
      id: "folder-8",
      status: "TRAITE",
      name: "Dossier Contrats",
      total_files: 22,
    },
  ],
};
