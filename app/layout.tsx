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
  metadataBase: new URL("https://caffe-ragi.vercel.app"),
  title: "Caffè Ragi | Café Especial Torrado em Três Pontas - MG",
  description:
    "Café especial 100% arábica, torrado artesanalmente em Três Pontas - Minas Gerais. Conheça o Caffè Ragi 85 e 75 pontos e compre no Mercado Livre.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Caffè Ragi | Café Especial Torrado em Três Pontas - MG",
    description:
      "Café especial 100% arábica, torrado artesanalmente em Três Pontas - Minas Gerais.",
    images: ["/images/flatlay-both-bags-cup.webp"],
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
