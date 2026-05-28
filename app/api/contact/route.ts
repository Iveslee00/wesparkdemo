import { NextRequest, NextResponse } from "next/server";

// To enable real email delivery:
// 1. npm install nodemailer @types/nodemailer
// 2. Set these env vars in .env.local:
//    SMTP_HOST=smtp.gmail.com
//    SMTP_PORT=587
//    SMTP_USER=your@gmail.com
//    SMTP_PASS=your_app_password
//    CONTACT_TO=ws.beauty@shiseido-ws.com.tw

type ContactBody = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export async function POST(req: NextRequest) {
  let body: ContactBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, subject, message } = body;
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // ─── Nodemailer integration (uncomment after npm install nodemailer) ──────
  //
  // import nodemailer from "nodemailer";
  //
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT) || 587,
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
  //
  // await transporter.sendMail({
  //   from: `"WIS Website" <${process.env.SMTP_USER}>`,
  //   to: process.env.CONTACT_TO,
  //   replyTo: email,
  //   subject: `[WIS Contact] ${subject}`,
  //   html: `
  //     <div style="font-family:sans-serif;max-width:600px">
  //       <h2 style="color:#4B2438">New Contact Form Submission</h2>
  //       <table cellpadding="8" style="width:100%;border-collapse:collapse">
  //         <tr><td style="color:#888;width:100px">Name</td><td>${name}</td></tr>
  //         <tr><td style="color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
  //         <tr><td style="color:#888">Phone</td><td>${body.phone || "—"}</td></tr>
  //         <tr><td style="color:#888">Subject</td><td>${subject}</td></tr>
  //       </table>
  //       <div style="margin-top:16px;padding:16px;background:#f5efe8;border-left:3px solid #4B2438">
  //         <pre style="white-space:pre-wrap;font-family:inherit">${message}</pre>
  //       </div>
  //     </div>
  //   `,
  // });
  //
  // ─────────────────────────────────────────────────────────────────────────

  console.log("[Contact Form]", { name, email, phone: body.phone, subject, message });

  return NextResponse.json({ ok: true });
}
