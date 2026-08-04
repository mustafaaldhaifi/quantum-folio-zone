import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { MagneticButton } from "./magnetic-button";
import { useContent, useLanguage } from "@/lib/i18n";

export function Contact() {
  const [sending, setSending] = useState(false);
  const { t } = useLanguage();
  const { profile } = useContent();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success(t("contact.sent"), { description: t("contact.sentDesc") });
    }, 700);
  };

  return (
    <Section
      id="contact"
      eyebrow={t("contact.eyebrow")}
      title={t("contact.title")}
      description={t("contact.description")}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="glass rounded-3xl p-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t("contact.direct")}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 flex items-center gap-3 text-lg font-semibold hover:text-primary"
          >
            <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <span className="truncate" dir="ltr">
              {profile.email}
            </span>
          </a>
          <div className="divider-glow my-7" />
          <p className="text-sm text-muted-foreground">
            {t("contact.basedIn")} {profile.location}. {t("contact.availability")}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="glass rounded-3xl p-8">
          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("contact.name")}
                name="name"
                type="text"
                placeholder={t("contact.namePlaceholder")}
              />
              <Field
                label={t("contact.email")}
                name="email"
                type="email"
                placeholder={t("contact.emailPlaceholder")}
              />
            </div>
            <Field
              label={t("contact.subject")}
              name="subject"
              type="text"
              placeholder={t("contact.subjectPlaceholder")}
            />
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder={t("contact.messagePlaceholder")}
                className="w-full resize-none rounded-2xl border border-input bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div>
              <MagneticButton type="submit">
                <Send className="h-4 w-4" aria-hidden="true" />
                {sending ? t("contact.sending") : t("contact.send")}
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-input bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}
