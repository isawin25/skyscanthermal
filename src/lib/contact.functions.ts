import { createServerFn } from "@tanstack/react-start";
import { sendInquiryEmail, type InquiryPayload } from "./email.server";
import { contactSchema } from "./contact.schema";

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.company) return { ok: false as const, error: "Submission rejected." };
    if (data.elapsedMs < 2500) {
      return { ok: false as const, error: "That was too fast — please try again." };
    }

    const totalBytes = (data.attachments ?? []).reduce((n, a) => n + a.content.length * 0.75, 0);
    if (totalBytes > 12_000_000) {
      return { ok: false as const, error: "Attachments are too large (12 MB max total)." };
    }

    const payload: InquiryPayload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      location: data.location,
      contactMethod: data.contactMethod,
      message: data.message,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      additional: data.additional,
      attachments: data.attachments ?? [],
    };

    return await sendInquiryEmail(payload);
  });
