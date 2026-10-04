"use client";

import { Cookie } from "lucide-react";
import { useState } from "react";

const consentOptions = [
  {
    label: "Accept cookies",
    className:
      "bg-primary text-primary-foreground shadow-[0_3px_0_var(--signal-dark)] hover:-translate-y-0.5",
  },
  {
    label: "Accept customized",
    className:
      "border border-border bg-background text-foreground hover:border-primary hover:text-primary",
  },
  {
    label: "Reject all",
    className: "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
];

export function Cookies() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl border border-border bg-background p-5 shadow-[8px_8px_0_var(--accent)] sm:inset-x-6 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="grid size-10 shrink-0 place-items-center border border-primary/40 bg-primary/10 text-primary">
          <Cookie className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                Your privacy, your call
              </p>
              <h2 className="mt-1 text-lg font-semibold">A few cookies?</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Close cookie notice"
              className="grid size-8 shrink-0 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ×
              </span>
            </button>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We use cookies to support site visits, remember preferences like your theme, and
            understand usage through analytics. Choose what works for you.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {consentOptions.map(({ label, className }) => (
              <button
                key={label}
                type="button"
                onClick={() => setIsVisible(false)}
                className={`inline-flex min-h-10 items-center justify-center px-4 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}