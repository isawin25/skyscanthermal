import { Link } from "@tanstack/react-router";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { PHONE_DISPLAY, PHONE_SMS, PHONE_TEL } from "@/lib/site";
import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 font-display text-base uppercase tracking-widest transition-all duration-200 rounded-xs";

export function CallButton({ className, label }: { className?: string; label?: string }) {
  return (
    <a
      href={PHONE_TEL}
      className={cn(
        base,
        "bg-primary text-primary-foreground hover:brightness-110 hover:glow-heat active:scale-[0.98]",
        className,
      )}
    >
      <Phone className="size-4" aria-hidden="true" />
      {label ?? `Call / Text ${PHONE_DISPLAY}`}
    </a>
  );
}

export function TextButton({ className }: { className?: string }) {
  return (
    <a
      href={PHONE_SMS}
      className={cn(
        base,
        "border border-border bg-surface text-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      <MessageSquare className="size-4" aria-hidden="true" />
      Text Us
    </a>
  );
}

export function GhostLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        base,
        "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}
