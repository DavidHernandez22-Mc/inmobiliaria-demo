import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { erode, generalSans } from "./fonts";

export const metadata: Metadata = {
  title: "Página no encontrada · Altamira Propiedades",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="es-CO" className={`${erode.variable} ${generalSans.variable}`}>
      <body>
        <main className="notfound">
          <p className="display" style={{ fontSize: "clamp(5rem, 20vw, 14rem)" }}>
            404
          </p>
          <h1 className="h-sub">Esta página no existe · This page does not exist</h1>
          <p>
            <Link className="btn btn--dark" href="/">
              Volver al inicio
            </Link>{" "}
            <Link className="btn btn--outline" href="/en/">
              Back to home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
