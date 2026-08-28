import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendInquiryEmail, type InquiryPayload } from "./email.server";

const attachment = z.object({
  filename: z.string().min(1).max(200),
  content: z.string().max(7_000_000), // base64
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  service: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2, "Please enter the property or project location").max(200),
  contactMethod: z.enum(["Phone Call", "Text", "Email"]),
  message: z.string().trim().min(10, "Please add a few details").max(4000),
  preferredDate: z.string().trim().max(40).optional().default(""),
  preferredTime: z.string().trim().max(40).optional().default(""),
  additional: z.string().trim().max(2000).optional().default(""),
  attachments: z.array(attachment).max(6).optional().default([]),
  // spam protection
  company: z.string().max(0, "Submission rejected").optional().default(""),
  elapsedMs: z.number().int().min(0),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
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
