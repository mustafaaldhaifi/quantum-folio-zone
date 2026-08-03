import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import { Particles } from "./particles";
import { MagneticButton } from "./magnetic-button";
import { profile } from "@/lib/portfolio-data";

function useTyping(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (cleared) {
          setDeleting(false);
          setIndex((i) => i + 1);
          return;
        }
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      done ? 1600 : deleting ? 40 : 85,
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const typed = useTyping(profile.typing);

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-20">
      <div className="aurora absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Particles />
      </div>

      <div className="mx-auto w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          Available for full-time and freelance work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-balance text-5xl font-bold leading-[0.95] sm:text-7xl"
        >
          {profile.name}
          <span className="mt-3 block gradient-text text-3xl sm:text-5xl">
            {typed}
            <span className="animate-caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] bg-accent align-middle" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          IT graduate turned product engineer. I design and ship end-to-end web platforms —
          typed, tested, and tuned to sub-second loads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#work">View selected work</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch
          </MagneticButton>
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll to about section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="animate-float-slow mt-16 inline-flex text-muted-foreground"
        >
          <ArrowDown className="h-5 w-5" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}
