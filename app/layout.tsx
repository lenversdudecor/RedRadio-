import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { PlayerProvider } from "@/app/context/PlayerContext";
import Preloader from "@/app/components/PreLoader";
import CookieConsent from "@/app/components/CookieConsent";
import Script from "next/script"; // <-- Importation indispensable pour Google Analytics
import "./globals.css";
import PlayerBarClient from "./components/PlayerBarClients";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "L'Envers du Décor",
  description: "Radio indépendante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-black text-neutral-200 font-sans selection:bg-white selection:text-black">
        
        {/* --- DÉBUT : GOOGLE ANALYTICS --- */}
        {/* N'oublie pas de remplacer G-XXXXXXXXXX par ton vrai ID de mesure */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-RSPDVNVMPG`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RSPDVNVMPG');
          `}
        </Script>
        {/* --- FIN : GOOGLE ANALYTICS --- */}

        <PlayerProvider>
          {/* Preloader */}
          <Preloader />
          
          {/* Contenu des pages */}
          {children}
          
          {/* PlayerBar (Via le wrapper client) */}
          <PlayerBarClient />
          
          {/* Bannière de Cookies */}
          <CookieConsent />
        </PlayerProvider>
      </body>
    </html>
  );
}