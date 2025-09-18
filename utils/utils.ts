// import { format } from "date-fns";
// import { fr } from "date-fns/locale";
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";

  // Gérer le format "YYYY:MM:DD HH:MM:SS"
  let date: Date;
  if (/^\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}$/.test(dateString)) {
    // Remplacer les ":" par "-" pour la date, puis " " par "T"
    // "2024:06:10 15:30:00" => "2024-06-10T15:30:00"
    const [datePart, timePart] = dateString.split(" ");
    const normalizedDate = datePart.replace(/:/g, "-") + "T" + timePart;
    date = new Date(normalizedDate);
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    return "Date invalide";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";

  // Vérifier si la date est valide
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Date invalide";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Fonction pour générer l'URL de l'avatar
export const getAvatarUrl = (name: string) => {
  // Utiliser une URL d'avatar basée sur le nom ou une URL par défaut
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&color=fff&size=40`;
};
