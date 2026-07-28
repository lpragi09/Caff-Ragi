import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const { name, email, whatsapp, message, website, startedAt } = body as {
    name?: string;
    email?: string;
    whatsapp?: string;
    message?: string;
    website?: string; // honeypot
    startedAt?: number; // ms timestamp when the form was rendered
  };

  // honeypot: bots preenchem campos escondidos
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // bots costumam enviar quase instantaneamente
  if (typeof startedAt === "number" && Date.now() - startedAt < 1500) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Preencha nome, e-mail e mensagem." },
      { status: 400 }
    );
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD não configurados");
    return NextResponse.json(
      { error: "Envio de e-mail não configurado no servidor." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Caffè Ragi — Site" <${user}>`,
      to: CONTACT.email,
      replyTo: email,
      subject: `Contato via site — ${name}`,
      text: [
        `Nome: ${name}`,
        `E-mail: ${email}`,
        whatsapp ? `WhatsApp: ${whatsapp}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Falha ao enviar e-mail de contato:", err);
    return NextResponse.json(
      { error: "Não foi possível enviar agora. Tente novamente." },
      { status: 500 }
    );
  }
}
