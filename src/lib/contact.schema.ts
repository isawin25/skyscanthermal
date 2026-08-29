import { z } from "zod";

const attachment = z.object({
  filename: z.string().min(1).max(200),
  content: z.string().max(7_000_000),
});

export const contactSchema = z.object({
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
  company: z.string().max(0, "Submission rejected").optional().default(""),
  elapsedMs: z.number().int().min(0),
});