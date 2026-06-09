"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";

const LOCALE_LABELS: Record<string, string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
  it: "IT",
  es: "ES",
};

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
        aria-label="Change language"
        aria-expanded={open}
      >
        {LOCALE_LABELS[locale]}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 min-w-[5rem] rounded-md border border-border bg-canvas shadow-md overflow-hidden">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={cn(
                  "block w-full px-4 py-2 text-left text-sm hover:bg-surface transition-colors",
                  l === locale ? "font-semibold text-brand-pink" : "text-ink"
                )}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/about" as const, label: t("about") },
    { href: "/services" as const, label: t("services") },
    { href: "/projects" as const, label: t("projects") },
    { href: "/brands" as const, label: t("brands") },
    { href: "/csr" as const, label: t("csr") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/[0.97] backdrop-blur-xl border-b border-gray-200 shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
          : "bg-canvas border-b border-transparent"
      )}
    >
      <nav className="max-content container-pad flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo/LogoOVG.png"
            alt="OpenVision Group"
            width={140}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          <LocaleSwitcher />
          <Button
            size="sm"
            render={<Link href="/contact" />}
          >
            {t("cta")}
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <LocaleSwitcher />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  className="p-1.5 text-ink"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-10">
              <nav className="flex flex-col gap-1 mt-4">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-ink hover:bg-surface rounded-md transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    className="w-full"
                    render={<Link href="/contact" onClick={() => setMobileOpen(false)} />}
                  >
                    {t("cta")}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
