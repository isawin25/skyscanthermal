import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Phone, Mail, MessageSquare, Loader2, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CallButton } from "@/components/site/CTAButtons";
import { submitContact } from "@/lib/contact.functions";
import { EMAIL, PHONE_DISPLAY, PHONE_SMS, PHONE_TEL, SERVICE_OPTIONS } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SkyScan Thermal Solutions | Call or Text 989-285-7977" },
      {
        name: "description",
        content:
          "Request a thermal drone flight for recovery or inspection in Michigan. Call or text 989-285-7977, or send a request with your project details.",
      },
      { property: "og:title", content: "Contact SkyScan Thermal Solutions" },
      {
        property: "og:description",
        content: "24/7 recovery response. Call or text 989-285-7977.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const field =
  "w-full min-h-12 border border-input bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function ContactPage() {
  const send = useServerFn(submitContact);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mounted = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const files = [
      ...(fd.getAll("photos") as File[]),
      ...(fd.getAll("thermal") as File[]),
    ].filter((f) => f && f.size > 0);

    if (files.some((f) => f.size > 5_000_000)) {
      toast.error("Each file must be under 5 MB.");
      return;
    }

    setSending(true);
    setErrors({});
    try {
      const attachments = await Promise.all(
        files.slice(0, 6).map(async (f) => ({ filename: f.name, content: await toBase64(f) })),
      );

      const res = await send({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          service: String(fd.get("service") ?? ""),
          location: String(fd.get("location") ?? ""),
          contactMethod: String(fd.get("contactMethod") ?? "Phone Call") as
            | "Phone Call"
            | "Text"
            | "Email",
          message: String(fd.get("message") ?? ""),
          preferredDate: String(fd.get("preferredDate") ?? ""),
          preferredTime: String(fd.get("preferredTime") ?? ""),
          additional: String(fd.get("additional") ?? ""),
          attachments,
          company: String(fd.get("company") ?? ""),
          elapsedMs: Date.now() - mounted.current,
        },
      });

      if (res.ok) {
        setSent(true);
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      const zodIssues = (err as { issues?: { path: (string | number)[]; message: string }[] }).issues;
      if (Array.isArray(zodIssues)) {
        const map: Record<string, string> = {};
        for (const i of zodIssues) map[String(i.path[0])] = i.message;
        setErrors(map);
        toast.error("Please check the highlighted fields.");
      } else {
        console.error(err);
        toast.error(
          `Something went wrong. Please call or text ${PHONE_DISPLAY}.`,
        );
      }
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <>
        <PageHero eyebrow="Contact" title="Request Received" />
        <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
          <div className="panel flex flex-col items-center gap-5 p-8 text-center md:p-12">
            <CheckCircle2 className="size-14 text-primary" aria-hidden="true" />
            <h2 className="h-section">Request Received</h2>
            <p className="text-muted-foreground">
              Thank you for contacting SkyScan Thermal Solutions. Your request has been sent
              successfully. We&apos;ll get back to you as soon as possible.
            </p>
            <div className="mt-4 w-full border-t border-border pt-6">
              <h3 className="h-card">Need immediate recovery assistance?</h3>
              <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
                <CallButton />
                <a
                  href={PHONE_SMS}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-border px-6 font-display text-base uppercase tracking-widest hover:border-primary hover:text-primary"
                >
                  <MessageSquare className="size-4" aria-hidden="true" /> Text {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="hud-label mt-2 underline hover:text-primary"
            >
              Send another request
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Contact SkyScan"
        title="Tell Us About Your Project"
        intro="Recovery calls are answered 24/7. For everything else, send the details below and we'll get back to you."
      />

      <section className="mx-auto grid max-w-[80rem] gap-10 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[1.4fr_0.6fr]">
        <Reveal>
          <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <Field label="Full Name" error={errors.name} required>
              <input name="name" required autoComplete="name" className={field} placeholder="Jane Doe" />
            </Field>

            <Field label="Phone Number" error={errors.phone} required>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                className={field}
                placeholder="989-555-0100"
              />
            </Field>

            <Field label="Email Address" error={errors.email} required>
              <input
                name="email"
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                className={field}
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Service Needed" error={errors.service} required>
              <select name="service" required defaultValue="" className={field}>
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Property / Project Location" error={errors.location} required className="md:col-span-2">
              <input
                name="location"
                required
                className={field}
                placeholder="Township, county or address"
              />
            </Field>

            <Field label="Preferred Contact Method" error={errors.contactMethod} required>
              <select name="contactMethod" required defaultValue="Phone Call" className={field}>
                <option>Phone Call</option>
                <option>Text</option>
                <option>Email</option>
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Preferred Date">
                <input name="preferredDate" type="date" className={field} />
              </Field>
              <Field label="Preferred Time">
                <input name="preferredTime" type="time" className={field} />
              </Field>
            </div>

            <Field label="Message" error={errors.message} required className="md:col-span-2">
              <textarea
                name="message"
                required
                rows={5}
                className={`${field} resize-y`}
                placeholder="What happened, what you need scanned, terrain, acreage, timing…"
              />
            </Field>

            <Field label="Additional Details" className="md:col-span-2">
              <textarea name="additional" rows={3} className={`${field} resize-y`} />
            </Field>

            <Field label="Upload Photos">
              <input
                name="photos"
                type="file"
                accept="image/*"
                multiple
                className={`${field} file:mr-3 file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-display file:uppercase file:text-primary-foreground`}
              />
            </Field>

            <Field label="Upload Thermal Images">
              <input
                name="thermal"
                type="file"
                accept="image/*"
                multiple
                className={`${field} file:mr-3 file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-display file:uppercase file:text-primary-foreground`}
              />
            </Field>

            <p className="hud-label flex items-center gap-2 md:col-span-2">
              <Paperclip className="size-3" aria-hidden="true" /> Up to 6 files, 5 MB each
            </p>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 bg-primary px-8 font-display text-xl uppercase tracking-widest text-primary-foreground transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
              >
                {sending && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
                {sending ? "Sending…" : "Send Request"}
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal delay={80} className="space-y-4">
          <div className="panel p-6">
            <h2 className="hud-label text-primary">Direct Line</h2>
            <a
              href={PHONE_TEL}
              className="mt-3 flex items-center gap-2 font-display text-3xl text-foreground hover:text-primary"
            >
              <Phone className="size-6 text-primary" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={PHONE_SMS}
              className="mt-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <MessageSquare className="size-4" aria-hidden="true" /> Text this number
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 flex items-center gap-2 break-all text-sm text-muted-foreground hover:text-primary"
            >
              <Mail className="size-4" aria-hidden="true" /> {EMAIL}
            </a>
          </div>
          <div className="panel p-6">
            <h2 className="hud-label text-primary">Recovery Response</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Recovery calls are answered 24/7. For time-sensitive recovery, call or text rather than
              using the form.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Field({
  label,
  children,
  error,
  required,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="hud-label mb-2 block text-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}
