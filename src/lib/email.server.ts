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
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

function encodeUtf8(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

function wrapBase64(value: string) {
  return value.match(/.{1,76}/g)?.join("\r\n") ?? "";
}

function attachmentType(filename: string) {
  const extension = filename.toLowerCase().split(".").pop();
  if (extension === "png") return "image/png";
  if (extension === "gif") return "image/gif";
  if (extension === "webp") return "image/webp";
  if (extension === "heic") return "image/heic";
  return "image/jpeg";
}

function createRawEmail(p: InquiryPayload) {
  const boundary = `skyscan-${crypto.randomUUID()}`;
  const lines = [
    `To: ${TO}`,
    `Reply-To: ${cleanHeader(p.email)}`,
    `Subject: ${SUBJECT}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(
      encodeUtf8(
        [
          `Customer Name: ${p.name}`,
          `Phone: ${p.phone}`,
          `Email: ${p.email}`,
          `Service Requested: ${p.service}`,
          `Project Location: ${p.location}`,
          `Preferred Contact Method: ${p.contactMethod}`,
          p.preferredDate ? `Preferred Date: ${p.preferredDate}` : "",
          p.preferredTime ? `Preferred Time: ${p.preferredTime}` : "",
          "",
          "Message:",
          p.message,
          p.additional ? `\nAdditional Details:\n${p.additional}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
    ),
  ];

  for (const attachment of p.attachments) {
    const filename = cleanHeader(attachment.filename).replace(/["\\]/g, "_");
    lines.push(
      `--${boundary}`,
      `Content-Type: ${attachmentType(filename)}; name="${filename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${filename}"`,
      "",
      wrapBase64(attachment.content),
    );
  }

  lines.push(`--${boundary}--`, "");
  return encodeUtf8(lines.join("\r\n"))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendInquiryEmail(p: InquiryPayload) {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const gmailApiKey = process.env["GOOGLE_MAIL_API_KEY"];

  if (!lovableApiKey || !gmailApiKey) {
    console.error("Gmail connector credentials are not configured");
    return {
      ok: false as const,
      error: "Email delivery is temporarily unavailable. Please call or text 989-285-7977.",
    };
  }

  try {
    const response = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": gmailApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: createRawEmail(p) }),
    });

    if (!response.ok) {
      console.error(`Gmail request failed [${response.status}]: ${await response.text()}`);
      return {
        ok: false as const,
        error:
          "We couldn't send your request. Please call or text 989-285-7977, or email Skyscanthermalllc@gmail.com.",
      };
    }
  } catch (err) {
    console.error("Gmail request threw", err);
    return {
      ok: false as const,
      error:
        "We couldn't send your request. Please call or text 989-285-7977, or email Skyscanthermalllc@gmail.com.",
    };
  }

  return { ok: true as const };
}
