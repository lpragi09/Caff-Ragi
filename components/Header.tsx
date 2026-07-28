"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MERCADO_LIVRE } from "@/lib/constants";

const NAV_LINKS = [
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-transparent.png"
            alt="Caffè Ragi"
            width={160}
            height={73}
            className="h-11 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-espresso/80 transition-colors hover:text-espresso"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={MERCADO_LIVRE.loja}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-espresso-light"
          >
            Comprar no Mercado Livre
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-espresso md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M2 5h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-espresso/10 bg-cream px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-espresso/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href={MERCADO_LIVRE.loja}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-espresso px-5 py-3 text-center text-sm font-semibold text-cream"
            >
              Comprar no Mercado Livre
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
