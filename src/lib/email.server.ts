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

function base64ToBlob(base64: string) {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes]);
}

/**
 * Sends the inquiry straight to the owner's inbox via FormSubmit.
 * No API keys, no domain verification — the first submission triggers a
 * one-time confirmation email to TO; clicking the link activates delivery.
 */
export async function sendInquiryEmail(p: InquiryPayload) {
  const form = new FormData();
  form.append("_subject", SUBJECT);
  form.append("_captcha", "false");
  form.append("_template", "table");
  form.append("_replyto", p.email);

  form.append("Customer Name", p.name);
  form.append("Phone", p.phone);
  form.append("Email", p.email);
  form.append("Service Requested", p.service);
  form.append("Project Location", p.location);
  form.append("Preferred Contact Method", p.contactMethod);
  if (p.preferredDate) form.append("Preferred Date", p.preferredDate);
  if (p.preferredTime) form.append("Preferred Time", p.preferredTime);
  form.append("Message", p.message);
  if (p.additional) form.append("Additional Details", p.additional);

  p.attachments.forEach((a, i) => {
    try {
      form.append(`attachment${i + 1}`, base64ToBlob(a.content), a.filename);
    } catch {
      /* skip unreadable attachment */
    }
  });

  try {
    const response = await fetch(`https://formsubmit.co/${encodeURIComponent(TO)}`, {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      console.error(`FormSubmit request failed [${response.status}]: ${await response.text()}`);
      return {
        ok: false as const,
        error:
          "We couldn't send your request. Please call or text 989-285-7977, or email Skyscanthermalllc@gmail.com.",
      };
    }
  } catch (err) {
    console.error("FormSubmit request threw", err);
    return {
      ok: false as const,
      error:
        "We couldn't send your request. Please call or text 989-285-7977, or email Skyscanthermalllc@gmail.com.",
    };
  }

  return { ok: true as const };
}
