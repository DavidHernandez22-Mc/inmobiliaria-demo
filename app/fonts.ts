import localFont from "next/font/local";

// Erode (Indian Type Foundry, Fontshare, ITF Free Font License): títulos y el nombre.
export const erode = localFont({
  src: [
    { path: "./fonts/Erode-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Erode-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Erode-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

// General Sans (Indian Type Foundry, Fontshare): texto, datos e interfaz.
export const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-text",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});
