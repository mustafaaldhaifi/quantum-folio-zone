import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useContent, useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  const { profile } = useContent();

  return (
    <footer className="relative border-t border-border/60 px-4 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {profile.role} · {profile.degree}. {t("footer.tagline")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: Github, label: "GitHub", href: "https://github.com" },
            { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
            { icon: Twitter, label: "X", href: "https://x.com" },
            { icon: Mail, label: "Email", href: `mailto:${profile.email}` },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="glass hover-lift grid h-11 w-11 place-items-center rounded-full"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <div className="divider-glow mx-auto my-8 max-w-6xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. {t("footer.rights")}</p>
        <p>{t("footer.built")}</p>
      </div>
    </footer>
  );
}
