import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { MagneticButton } from "./magnetic-button";
import { profile } from "@/lib/portfolio-data";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent", { description: "I'll get back to you within 24 hours." });
    }, 700);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something fast and beautiful"
      description="Tell me about the role or project — I reply within a day."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="glass rounded-3xl p-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Direct
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 flex items-center gap-3 text-lg font-semibold hover:text-primary"
          >
            <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <span className="truncate">{profile.email}</span>
          </a>
          <div className="divider-glow my-7" />
          <p className="text-sm text-muted-foreground">
            Based in {profile.location}. Available for full-time roles, contract work and
            long-term product partnerships.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="glass rounded-3xl p-8">
          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" type="text" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            </div>
            <Field label="Subject" name="subject" type="text" placeholder="What's this about?" />
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="A few lines about the project..."
                className="w-full resize-none rounded-2xl border border-input bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div>
              <MagneticButton type="submit">
                <Send className="h-4 w-4" aria-hidden="true" />
                {sending ? "Sending..." : "Send message"}
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
