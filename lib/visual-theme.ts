export type VisualThemeMode = "dark" | "light"

export function getVisualThemeMode(resolvedTheme?: string): VisualThemeMode {
  if (resolvedTheme === "light" || resolvedTheme === "dark") {
    return resolvedTheme
  }

  if (typeof document !== "undefined") {
    if (document.documentElement.classList.contains("light")) {
      return "light"
    }
  }

  return "dark"
}

export const avatarPalettes = {
  dark: {
    hair: "#2c1a19",
    skin: "#b87954",
    hairHighlight: "#be845e",
    eyebrow: "#34201d",
    pupil: "#2d2d2d",
    nose: "#9e6548",
    lip: "#7f3b52",
    lipHighlight: "#9a5470",
    blush: "#d38984",
    earring: "#f6c24b",
    backgroundStart: "#1e293b",
    backgroundEnd: "#0f172a",
  },
  light: {
    hair: "#3b2721",
    skin: "#c68963",
    hairHighlight: "#d0a07c",
    eyebrow: "#402a24",
    pupil: "#2d2d2d",
    nose: "#a97256",
    lip: "#9d5f7e",
    lipHighlight: "#bb7f9b",
    blush: "#efb2b4",
    earring: "#f6c24b",
    backgroundStart: "#f6dce9",
    backgroundEnd: "#eadffb",
  },
} as const

export const aboutPalettes = {
  dark: {
    cardStart: "#1e293b",
    cardEnd: "#0f172a",
    laptopShell: "#2d3748",
    laptopScreen: "#1a202c",
    codeAccent: "#4ecdc4",
    codeMuted: "#a0aec0",
    codeHighlight: "#f472b6",
    cup: "#8b5cf6",
    cupDetail: "#6d28d9",
    plantPot: "#f97316",
    plantLeaf: "#22c55e",
    plantLeafDark: "#16a34a",
    symbolWarm: "#ffd93d",
  },
  light: {
    cardStart: "#f6dff0",
    cardEnd: "#efe5ff",
    laptopShell: "#9b8fbe",
    laptopScreen: "#61567f",
    codeAccent: "#73cbbb",
    codeMuted: "#cbbfd8",
    codeHighlight: "#ee95b9",
    cup: "#f1ab7f",
    cupDetail: "#d88b67",
    plantPot: "#f4a870",
    plantLeaf: "#7fcf9f",
    plantLeafDark: "#58ad7d",
    symbolWarm: "#f3cf77",
  },
} as const

export const scenePalettes = {
  dark: {
    background: "#1e293b",
    accent: "#4ecdc4",
    accentSecondary: "#4ecdc4",
    accentWarm: "#4ecdc4",
    light: "#ffffff",
  },
  light: {
    background: "#fff8fc",
    accent: "#e7a0bf",
    accentSecondary: "#94c7f2",
    accentWarm: "#f2c58b",
    light: "#ffffff",
  },
} as const

export const backgroundPalettes = {
  dark: {
    orbs: ["rgba(78, 205, 196, 0.15)", "rgba(87, 181, 231, 0.12)", "rgba(125, 211, 252, 0.1)"],
    shapes: ["#4ecdc4", "#57b5e7", "#7dd3fc", "#5eead4", "#67e8f9"],
  },
  light: {
    orbs: ["rgba(243, 166, 200, 0.34)", "rgba(156, 201, 255, 0.3)", "rgba(159, 217, 179, 0.28)"],
    shapes: ["#f3a6c8", "#f6aaa1", "#9cc9ff", "#9fd9b3", "#c7b0ff"],
  },
} as const
