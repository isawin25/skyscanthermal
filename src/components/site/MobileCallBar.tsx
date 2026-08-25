import { Phone, MessageSquare } from "lucide-react";
import { PHONE_SMS, PHONE_TEL } from "@/lib/site";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <a
        href={PHONE_TEL}
        className="flex min-h-14 items-center justify-center gap-2 bg-primary font-display text-lg uppercase tracking-widest text-primary-foreground"
      >
        <Phone className="size-5" aria-hidden="true" /> Call
      </a>
      <a
        href={PHONE_SMS}
        className="flex min-h-14 items-center justify-center gap-2 font-display text-lg uppercase tracking-widest text-foreground"
      >
        <MessageSquare className="size-5" aria-hidden="true" /> Text
      </a>
    </div>
  );
}
