import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import { siteUrl } from "@/lib/env";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Cuerpo/UI: sans minimalista. Titulares: sans condensada fuerte (estilo badge/outdoor).
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nombre del Negocio", // TODO: definir nombre real
    template: "%s | Nombre del Negocio",
  },
  description: "Descripción del negocio y propuesta de valor.", // TODO: copy final
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Nombre del Negocio", // TODO: nombre real
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${manrope.variable} ${oswald.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg text-text antialiased">
        {/* Añade clase "js" síncrono antes del primer paint.
            Sin JS: no se añade → .reveal permanece opacity:1 (degradación segura). */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
