import { Link } from "@tanstack/react-router";
import { Bot, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Cookies } from "@/components/ui/Cookies";

const nav = [
  { to: "/explore" as const, label: "Explore" },
  { to: "/publish" as const, label: "Publish" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

function CursorCompanion() {
  const [point, setPoint] = useState({ x: -100, y: -100 });
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const move = (event: PointerEvent) =>
      setPoint({ x: event.clientX + 18, y: event.clientY + 18 });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      className="cursor-companion pointer-events-none fixed z-[70] hidden size-8 place-items-center rounded-sm border border-primary bg-background text-primary shadow-sm lg:grid"
      style={{ left: point.x, top: point.y, animation: "cursor-hop 1.2s ease-in-out infinite" }}
      aria-hidden
    >
      <Bot className="size-4" />
      <span className="absolute -right-4 -top-3 font-mono text-[9px] text-primary">π</span>
    </div>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground math-grid">
      <CursorCompanion />
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link to="/" className="font-display text-2xl font-bold">
            L<span className="text-primary">&</span>P
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="ink" size="sm" className="hidden rounded-sm md:inline-flex">
            <Link to="/publish">Publish your build</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav className="grid border-t border-border bg-background p-5 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-mono text-xs uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      {children}
      <footer className="border-t border-border bg-background px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="font-display text-2xl font-bold">
              Lunar <span className="text-primary">&</span> Pauer
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Build it. Ship it. Let people use it.
            </p>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase text-muted-foreground">Platform</p>
            <div className="grid gap-3 text-sm">
              <Link to="/explore">Explore</Link>
              <Link to="/publish">Publish</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase text-muted-foreground">Connect</p>
            <div className="grid gap-3 text-sm">
              <Link to="/contact">Contact</Link>
              <span className="text-muted-foreground">GitHub · X · LinkedIn</span>
              <span className="text-muted-foreground">Privacy · Terms</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-7xl border-t border-border pt-6 font-mono text-[9px] uppercase text-muted-foreground">
          © 2026 Lunar & Pauer · Early ecosystem
        </div>
      </footer>
      <Cookies />
    </div>
  );
}
