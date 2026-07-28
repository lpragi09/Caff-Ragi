"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#produtos", label: "Produtos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

function smoothScrollTo(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(href);
    history.pushState(null, "", href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link
          href="#inicio"
          onClick={(e) => handleNavClick(e, "#inicio")}
          className="flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-espresso-light">
            <Image
              src="/images/logo-icon.png"
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg text-cream">Caffè Ragi</span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-cream/50">
              café especial
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium tracking-wide text-cream/70 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#produtos"
            onClick={(e) => handleNavClick(e, "#produtos")}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="20.5" r="1.3" fill="currentColor" />
              <circle cx="17.5" cy="20.5" r="1.3" fill="currentColor" />
            </svg>
            Comprar
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream md:hidden"
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
        <div className="border-t border-cream/10 bg-ink px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-cream/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#produtos"
              onClick={(e) => handleNavClick(e, "#produtos")}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-espresso"
            >
              Comprar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
