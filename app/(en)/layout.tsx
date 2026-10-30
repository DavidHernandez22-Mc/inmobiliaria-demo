import type { Viewport } from "next";
import "../globals.css";
import { RootDocument } from "@/components/RootDocument";

export const viewport: Viewport = { themeColor: "#dedad3", width: "device-width", initialScale: 1 };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
