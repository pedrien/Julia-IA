export const ruinartColors = {
  sable: "#CBAE76", // Or Sablé
  noir: "#1C1C1C", // Noir Intense
  sableLight: "#E5D4A6", // Sablé Clair
  sableDark: "#B8975F", // Sablé Foncé
  noirLight: "#2D2D2D", // Noir Léger
  accent1: "#D4B887", // Beige Doré
  accent2: "#F4E4BC", // Crème Dorée
  accent3: "#A0845C", // Bronze
  accent4: "#8B7355", // Taupe Doré
  white: "#FFFFFF",
  gray: "#F5F5F5",
}

export const chartColorPalettes = {
  primary: [
    ruinartColors.sable,
    ruinartColors.sableDark,
    ruinartColors.accent1,
    ruinartColors.accent3,
    ruinartColors.accent4,
  ],
  gradient: [
    ruinartColors.sableLight,
    ruinartColors.sable,
    ruinartColors.sableDark,
    ruinartColors.accent3,
    ruinartColors.noir,
  ],
  monochrome: [
    ruinartColors.sableLight,
    ruinartColors.sable,
    ruinartColors.sableDark,
    ruinartColors.accent3,
    ruinartColors.accent4,
  ],
}

export const createGradient = (color1: string, color2: string) => ({
  type: "linear" as const,
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: color1 },
    { offset: 1, color: color2 },
  ],
})
