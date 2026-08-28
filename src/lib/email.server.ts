export type InquiryPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  contactMethod: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
  additional?: string;
  attachments: { filename: string; content: string }[];
};

const TO = "Skyscanthermalllc@gmail.com";
const SUBJECT = "NEW SKYSCAN THERMAL SOLUTIONS WEBSITE INQUIRY";

function esc(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr><td style="padding:8px 12px;background:#111;color:#888;font:600 12px/1.4 Arial;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;vertical-align:top">${esc(
    label,
  )}</td><td style="padding:8px 12px;background:#1b1b1b;color:#fff;font:14px/1.5 Arial">${esc(
    value,
  ).replace(/\n/g, "<br>")}</td></tr>`;
}

export async function sendInquiryEmail(p: InquiryPayload) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured — cannot deliver contact form email.");
    return {
      ok: false as const,
      error:
        "Email delivery is not configured yet. Please call or text 989-285-7977 while we get this fixed.",
    };
  }

  const from = process.env["CONTACT_FROM_EMAIL"] ?? "SkyScan Website <onboarding@resend.dev>";

  const html = `<div style="background:#080808;padding:24px;font-family:Arial,sans-serif">
    <h1 style="color:#FF5A00;font:700 20px Arial;letter-spacing:1px;text-transform:uppercase;margin:0 0 16px">
      New SkyScan Thermal Solutions Website Inquiry
    </h1>
    <table cellspacing="1" cellpadding="0" style="border-collapse:separate;background:#080808;width:100%;max-width:640px">
      ${row("Customer Name", p.name)}
      ${row("Phone", p.phone)}
      ${row("Email", p.email)}
      ${row("Service Requested", p.service)}
      ${row("Project Location", p.location)}
      ${row("Preferred Contact Method", p.contactMethod)}
      ${row("Preferred Date", p.preferredDate)}
      ${row("Preferred Time", p.preferredTime)}
      ${row("Message", p.message)}
      ${row("Additional Details", p.additional)}
      ${row("Uploaded Files", p.attachments.map((a) => a.filename).join(", "))}
    </table>
  </div>`;

  const text = [
    `Customer Name: ${p.name}`,
    `Phone: ${p.phone}`,
    `Email: ${p.email}`,
    `Service Requested: ${p.service}`,
    `Project Location: ${p.location}`,
    `Preferred Contact Method: ${p.contactMethod}`,
    p.preferredDate ? `Preferred Date: ${p.preferredDate}` : "",
    p.preferredTime ? `Preferred Time: ${p.preferredTime}` : "",
    `Message: ${p.message}`,
    p.additional ? `Additional Details: ${p.additional}` : "",
    p.attachments.length ? `Uploaded Files: ${p.attachments.map((a) => a.filename).join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [TO],
      reply_to: p.email,
      subject: SUBJECT,
      html,
      text,
      attachments: p.attachments.map((a) => ({ filename: a.filename, content: a.content })),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Resend request failed [${response.status}]: ${body}`);
    return {
      ok: false as const,
      error:
        "We couldn't send your request. Please call or text 989-285-7977, or email Skyscanthermalllc@gmail.com.",
    };
  }

  return { ok: true as const };
}
