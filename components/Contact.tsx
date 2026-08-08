"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/constants";
import Reveal from "@/components/Reveal";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (website) return; // honeypot

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp, message, website, startedAt }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Não foi possível enviar agora.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setWhatsapp("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Não foi possível enviar agora. Verifique sua conexão.");
    }
  }

  return (
    <section id="contato" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs font-medium text-cream/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Contato
          </span>
          <h2 className="mt-5 max-w-xl font-serif text-3xl text-cream sm:text-4xl">
            Quer comprar? A gente ajuda você a escolher.
          </h2>
          <p className="mt-4 max-w-xl text-cream/65">
            Deixe seu contato e conte como você prepara o seu café.
            Recomendamos a torra ideal e tiramos suas dúvidas.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-cream/10 bg-cream/[0.03] p-8"
          >
            <h3 className="font-serif text-xl text-cream">
              Vamos encontrar o seu café ideal
            </h3>
            <p className="mt-2 text-sm text-cream/60">
              Conte seu método de preparo (coador, prensa, espresso) e o
              perfil que você gosta. A gente recomenda a torra certa.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label
                className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                Não preencha este campo
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-cream/70">
                Nome
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="rounded-xl border border-cream/15 bg-ink px-4 py-2.5 text-cream placeholder:text-cream/30 outline-none focus:border-gold"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-cream/70">
                E-mail
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="rounded-xl border border-cream/15 bg-ink px-4 py-2.5 text-cream placeholder:text-cream/30 outline-none focus:border-gold"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-cream/70 sm:col-span-2">
                WhatsApp (opcional)
                <input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(35) 9 8887-7102"
                  className="rounded-xl border border-cream/15 bg-ink px-4 py-2.5 text-cream placeholder:text-cream/30 outline-none focus:border-gold"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-cream/70 sm:col-span-2">
                Mensagem
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex.: Gosto de café doce, faço coador, quero algo para o dia a dia..."
                  rows={4}
                  className="resize-y rounded-xl border border-cream/15 bg-ink px-4 py-2.5 text-cream placeholder:text-cream/30 outline-none focus:border-gold"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-gold-light disabled:opacity-60"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {status === "sending" ? "Enviando..." : "Enviar"}
            </button>

            {status === "success" && (
              <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                Mensagem enviada com sucesso! Em breve entramos em contato.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMsg}
              </p>
            )}
          </form>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 transition-colors hover:border-gold/30"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-cream">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold-light">
                  <path
                    d="M3 6h18v12H3V6Zm0 0 9 7 9-7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                E-mail
              </p>
              <p className="mt-1 text-sm text-cream/60">{CONTACT.email}</p>
            </a>

            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 transition-colors hover:border-gold/30"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-cream">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold-light">
                  <path
                    d="M4 20l1.4-4.2A7.5 7.5 0 1 1 8.6 19L4 20Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                WhatsApp
              </p>
              <p className="mt-1 text-sm text-cream/60">{CONTACT.whatsapp}</p>
            </a>

            <div className="rounded-2xl border border-cream/10 bg-gradient-to-br from-espresso to-ink p-5">
              <p className="font-serif text-lg italic text-cream">
                &ldquo;Um bom café começa numa boa torra.&rdquo;
              </p>
              <p className="mt-2 text-sm text-cream/60">
                A gente ajuda você a acertar a torra e o modo de preparo
                certo para o seu paladar.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
