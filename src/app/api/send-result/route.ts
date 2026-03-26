import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, groups, total } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const groupsHtml = groups
    .map(
      (g: { title: string; items: string[] }) => `
      <div style="margin-bottom:20px;">
        <div style="font-size:13px;font-weight:700;color:#065f46;text-transform:uppercase;border-bottom:1px solid #d1fae5;padding-bottom:6px;margin-bottom:8px;">
          ${g.title}
        </div>
        ${g.items
          .map(
            (item: string) => `
          <div style="display:flex;gap:8px;margin-bottom:6px;">
            <span style="color:#10b981;font-weight:700;">✓</span>
            <span style="font-size:14px;color:#374151;">${item}</span>
          </div>`
          )
          .join("")}
      </div>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:32px;margin-bottom:8px;">🌿</div>
        <h1 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 8px;">
          Насколько ваш организм нуждается в детоксе?
        </h1>
        <div style="display:inline-block;background:#d1fae5;color:#065f46;font-weight:700;padding:6px 16px;border-radius:20px;font-size:14px;">
          Отмечено утверждений: ${total}
        </div>
      </div>
      ${groupsHtml || "<p style='color:#9ca3af;text-align:center;'>Ни одного пункта не отмечено</p>"}
      <div style="margin-top:32px;border-top:1px solid #f3f4f6;padding-top:16px;text-align:center;color:#d1d5db;font-size:12px;">
        pomoynetskayabot.ru
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: "Детокс-тест <noreply@pomoynetskayabot.ru>",
    to: email,
    subject: "Ваши результаты детокс-теста",
    html,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
