import { Link } from "@tanstack/react-router";
import { Languages, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useContent, useLanguage } from "@/lib/i18n";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, toggleLang } = useLanguage();
  const { profile } = useContent();

  const links = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.skills"), href: "/#skills" },
    { label: t("nav.work"), href: "/#work" },
    { label: t("nav.experience"), href: "/#experience" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass shadow-lg" : "border border-transparent"
        }`}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2 font-display text-sm font-bold">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary font-mono text-primary-foreground">
            MA
          </span>
          <span className="truncate">{profile.name}</span>
        </Link>

        <ul className="ms-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ms-auto flex shrink-0 items-center gap-2 md:ms-0">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("nav.language")}
            title={t("nav.language")}
            className="glass inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-xs font-semibold"
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            {lang === "en" ? "العربية" : "EN"}
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            className="glass grid h-10 w-10 place-items-center rounded-full md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass animate-fade-in mx-auto mt-2 max-w-6xl rounded-3xl p-4 md:hidden">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
