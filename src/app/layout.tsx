import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Oswald } from "next/font/google";
import { siteUrl } from "@/lib/env";
import { getStoreSchema, getWebsiteSchema } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
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

const SITE_TITLE = "Futarte — Regalos y Souvenirs de Futaleufú";
const SITE_DESCRIPTION =
  "Regalos y souvenirs de Futaleufú: ropa, botellas, mates y piezas únicas con la identidad de la Patagonia chilena. Llévate un pedacito del sur.";
const OG_DESCRIPTION =
  "Regalos y souvenirs de Futaleufú: ropa, botellas, mates y piezas únicas de la Patagonia chilena.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Futarte",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(siteUrl),
  verification: {
    google: "7HRL77Glmf1782FP6mi0BK8or_Wok9XI3vbzQf4Wsc4",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Futarte",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: "/logo_futarte.webp",
        width: 800,
        height: 800,
        alt: "Futarte — Souvenirs de Futaleufú",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    images: ["/logo_futarte.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${manrope.variable} ${oswald.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg text-text antialiased">
        {/* Añade clase "js" síncrono antes del primer paint.
            Sin JS: no se añade → .reveal permanece opacity:1 (degradación segura). */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
        <JsonLd data={[getStoreSchema(), getWebsiteSchema()]} />
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>

        {/* Google Analytics (GA4) — carga diferida tras la hidratación */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HMEDNYRC9M"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HMEDNYRC9M');`}
        </Script>
      </body>
    </html>
  );
}
