import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";
import { z } from "zod";

const Schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const data = Schema.parse(json);

          // Nodemailer via Gmail — set these two env vars:
          //   GMAIL_USER  → your Gmail address (e.g. you@gmail.com)
          //   GMAIL_APP_PASS → a Gmail App Password (not your real password)
          //     Generate one at: https://myaccount.google.com/apppasswords
          //     (requires 2-Step Verification to be enabled on your Google account)
          const gmailUser = process.env.GMAIL_USER;
          const gmailPass = process.env.GMAIL_APP_PASS;
          const to = process.env.CONTACT_TO ?? gmailUser;

          if (!gmailUser || !gmailPass) {
            return Response.json(
              { ok: false, error: "Email not configured. Set GMAIL_USER and GMAIL_APP_PASS env vars." },
              { status: 500 },
            );
          }

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: gmailUser,
              pass: gmailPass,
            },
          });

          await transporter.sendMail({
            from: `"${data.name}" <${gmailUser}>`,
            to,
            replyTo: data.email,
            subject: `📬 Portfolio contact from ${data.name}`,
            text: `${data.message}\n\nFrom: ${data.name} <${data.email}>`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0a0a0a;color:#fff;border-radius:12px;border:1px solid #222;">
                <h2 style="color:#fff;margin-bottom:4px;">New message from your portfolio</h2>
                <p style="color:#888;margin-top:0;font-size:14px;">Someone reached out via your contact form</p>
                <hr style="border:none;border-top:1px solid #222;margin:16px 0"/>
                <p style="margin:0;font-size:13px;color:#aaa;">FROM</p>
                <p style="margin:4px 0 16px;font-size:16px;font-weight:600;">${data.name} &lt;<a href="mailto:${data.email}" style="color:#7c7cff;">${data.email}</a>&gt;</p>
                <p style="margin:0;font-size:13px;color:#aaa;">MESSAGE</p>
                <p style="margin:4px 0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                <hr style="border:none;border-top:1px solid #222;margin:24px 0"/>
                <p style="font-size:12px;color:#555;">Sent from Samrat Chakraborty's portfolio contact form</p>
              </div>
            `,
          });

          return Response.json({ ok: true });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          return Response.json({ ok: false, error: msg }, { status: 400 });
        }
      },
    },
  },
});
