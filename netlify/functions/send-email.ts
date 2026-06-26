import type { Handler, HandlerEvent } from "@netlify/functions";
import nodemailer from "nodemailer";

interface ContactPayload {
  email: string;
  message: string;
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "";

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN || origin || "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers.origin ?? event.headers.Origin ?? "";

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Metodo nao permitido." }),
    };
  }

  let payload: ContactPayload;

  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Body invalido." }),
    };
  }

  const email = payload.email?.trim();
  const message = payload.message?.trim();

  if (!email || !message) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "Campos obrigatorios: email, message." }),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: "E-mail invalido." }),
    };
  }

  const requiredEnv = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "CONTACT_EMAIL",
  ].filter((key) => !process.env[key]);

  if (requiredEnv.length > 0) {
    return {
      statusCode: 500,
      headers: corsHeaders(origin),
      body: JSON.stringify({
        error: "Variaveis de e-mail nao configuradas no servidor.",
      }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: `Vinicius Cecatto <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: "[Curriculo Web] Nova mensagem Landing Page",
      text: `E-mail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>E-mail:</strong> ${safeEmail}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return {
      statusCode: 200,
      headers: corsHeaders(origin),
      body: JSON.stringify({ message: "E-mail enviado com sucesso." }),
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return {
      statusCode: 500,
      headers: corsHeaders(origin),
      body: JSON.stringify({
        error: "Falha ao enviar o e-mail. Tente novamente mais tarde.",
      }),
    };
  }
};

export { handler };
