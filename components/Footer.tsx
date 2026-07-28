import Image from "next/image";
import { CONTACT, SOCIAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <Image
              src="/images/logo-transparent.png"
              alt="Caffè Ragi"
              width={160}
              height={73}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-cream/55">
              Café especial do sul de Minas, torrado artesanalmente em Três
              Pontas &ndash; MG.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Contato
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href={`mailto:${CONTACT.email}`} className="text-cream/70 hover:text-cream">
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-cream"
              >
                {CONTACT.whatsapp}
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Redes Sociais
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/40 hover:text-cream"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/40 hover:text-cream"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 20l1.4-4.2A7.5 7.5 0 1 1 8.6 19L4 20Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="E-mail"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/40 hover:text-cream"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6h18v12H3V6Zm0 0 9 7 9-7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-8 text-center text-xs text-cream/45">
          <p>&copy; {new Date().getFullYear()} Caffè Ragi. Todos os direitos reservados.</p>
        </div>
      </div>
      <div className="italian-rule">
        <span />
        <span />
        <span />
      </div>
    </footer>
  );
}
