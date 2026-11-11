import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://caff-ragi.vercel.app"),
  title: "Caffè Ragi | Três Pontas - MG",
  description:
    "Café especial 100% arábica, torrado artesanalmente em Três Pontas - Minas Gerais. Lote de 83,5 pontos com notas de chocolate e frutas cítricas, em pacotes de 500g e 1kg.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Caffè Ragi | Três Pontas - MG",
    description:
      "Café especial 100% arábica, torrado artesanalmente em Três Pontas - Minas Gerais.",
    images: [{ url: "/images/og-cafe-ragi.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-ink text-cream">
        {children}
      </body>
    </html>
  );
}
