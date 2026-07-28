import Image from "next/image";
import { MERCADO_LIVRE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-espresso-light">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div>
            <Image
              src="/images/logo-transparent.png"
              alt="Caffè Ragi"
              width={160}
              height={73}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-cream/60">
              Café especial torrado artesanalmente em Três Pontas, Minas
              Gerais.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a href="#produtos" className="text-cream/70 hover:text-cream">
              Produtos
            </a>
            <a href="#sobre" className="text-cream/70 hover:text-cream">
              Sobre
            </a>
            <a
              href={MERCADO_LIVRE.loja}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/70 hover:text-cream"
            >
              Loja no Mercado Livre
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Feito em Três Pontas &ndash; MG</p>
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
