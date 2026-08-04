import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  experience,
  profile,
  skills,
  stats,
  testimonials,
  projects,
  type Project,
} from "./portfolio-data";
import {
  categoryLabelsAr,
  experienceAr,
  localizeProject,
  profileAr,
  skillGroupsAr,
  statLabelsAr,
  testimonialsAr,
} from "./portfolio-ar";

export type Lang = "en" | "ar";

const STORAGE_KEY = "portfolio-lang";

const dict = {
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.work": "Work",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.language": "Switch to Arabic",
    "hero.badge": "Available for full-time and freelance work",
    "hero.lead":
      "IT graduate turned product engineer. I design and ship end-to-end web platforms — typed, tested, and tuned to sub-second loads.",
    "hero.cta1": "View selected work",
    "hero.cta2": "Get in touch",
    "hero.scroll": "Scroll to about section",
    "about.eyebrow": "About me",
    "about.title": "Engineering rigour, product craft.",
    "about.graduated": "Graduated with distinction",
    "about.open": "Open to hybrid and remote",
    "about.currently": "Currently",
    "about.building": "Building",
    "about.buildingText": "A streaming analytics platform at Northlight Labs",
    "about.learning": "Learning",
    "about.learningText": "Distributed systems and Rust for edge workloads",
    "about.writing": "Writing",
    "about.writingText": "Notes on Core Web Vitals and edge rendering",
    "skills.eyebrow": "Capabilities",
    "skills.title": "What I work with daily",
    "skills.description":
      "A full-stack toolkit built around type safety, performance budgets and maintainable systems.",
    "stack.eyebrow": "Stack",
    "stack.title": "Technology stack",
    "stack.description": "The tools I reach for when shipping production software.",
    "exp.eyebrow": "Journey",
    "exp.title": "Experience timeline",
    "exp.description":
      "From coursework to production systems used by tens of thousands of people.",
    "testimonials.eyebrow": "Feedback",
    "testimonials.title": "What people say",
    "testimonials.description": "Notes from the teams I've built with.",
    "work.eyebrow": "Selected work",
    "work.title": "Featured projects",
    "work.description":
      "Three products where I owned architecture, interface and delivery end to end.",
    "apps.eyebrow": "Archive",
    "apps.title": "All applications",
    "apps.description": "Everything shipped across platforms, commerce, AI and mobile.",
    "contact.eyebrow": "Contact",
    "contact.title": "Let's build something fast and beautiful",
    "contact.description": "Tell me about the role or project — I reply within a day.",
    "contact.direct": "Direct",
    "contact.basedIn": "Based in",
    "contact.availability":
      "Available for full-time roles, contract work and long-term product partnerships.",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "you@company.com",
    "contact.subject": "Subject",
    "contact.subjectPlaceholder": "What's this about?",
    "contact.message": "Message",
    "contact.messagePlaceholder": "A few lines about the project...",
    "contact.send": "Send message",
    "contact.sending": "Sending...",
    "contact.sent": "Message sent",
    "contact.sentDesc": "I'll get back to you within 24 hours.",
    "footer.tagline": "Building fast, accessible products for the web.",
    "footer.rights": "All rights reserved.",
    "footer.built": "Designed and built with React, Tailwind CSS and Motion.",
    "project.back": "Back to portfolio",
    "project.demo": "Live demo",
    "project.source": "Source code",
    "project.overview": "Overview",
    "project.role": "Role",
    "project.duration": "Duration",
    "project.tech": "Technologies",
    "project.features": "Key features",
    "project.more": "More projects",
    "project.notFound": "Project not found",
    "project.notFoundDesc": "This case study doesn't exist.",
  },
  ar: {
    "nav.about": "نبذة",
    "nav.skills": "المهارات",
    "nav.work": "الأعمال",
    "nav.experience": "الخبرة",
    "nav.contact": "تواصل",
    "nav.openMenu": "فتح القائمة",
    "nav.closeMenu": "إغلاق القائمة",
    "nav.language": "التبديل إلى الإنجليزية",
    "hero.badge": "متاح للعمل بدوام كامل والعمل الحر",
    "hero.lead":
      "خريج تقنية معلومات تحوّل إلى مهندس منتج. أصمّم وأطلق منصات ويب متكاملة — موثّقة الأنواع، مختبَرة، ومضبوطة لتحميل أقل من ثانية.",
    "hero.cta1": "استعرض الأعمال",
    "hero.cta2": "تواصل معي",
    "hero.scroll": "انتقل إلى قسم النبذة",
    "about.eyebrow": "نبذة عني",
    "about.title": "صرامة هندسية وحِرفية منتج.",
    "about.graduated": "تخرّج بمرتبة الشرف",
    "about.open": "منفتح على العمل الهجين وعن بُعد",
    "about.currently": "حالياً",
    "about.building": "أبني",
    "about.buildingText": "منصة تحليلات تدفقية في نورث لايت لابز",
    "about.learning": "أتعلّم",
    "about.learningText": "الأنظمة الموزّعة ولغة Rust لأحمال الحافة",
    "about.writing": "أكتب",
    "about.writingText": "ملاحظات حول مؤشرات الويب الأساسية والعرض من الحافة",
    "skills.eyebrow": "القدرات",
    "skills.title": "ما أعمل به يومياً",
    "skills.description":
      "أدوات متكاملة مبنية حول أمان الأنواع وميزانيات الأداء والأنظمة القابلة للصيانة.",
    "stack.eyebrow": "التقنيات",
    "stack.title": "حزمة التقنيات",
    "stack.description": "الأدوات التي أعتمد عليها عند إطلاق برمجيات إنتاجية.",
    "exp.eyebrow": "المسيرة",
    "exp.title": "الخط الزمني للخبرة",
    "exp.description": "من مقاعد الدراسة إلى أنظمة إنتاجية يستخدمها عشرات الآلاف.",
    "testimonials.eyebrow": "آراء",
    "testimonials.title": "ماذا يقول الآخرون",
    "testimonials.description": "ملاحظات من الفرق التي عملت معها.",
    "work.eyebrow": "أعمال مختارة",
    "work.title": "مشاريع مميزة",
    "work.description": "ثلاثة منتجات تولّيت فيها البنية والواجهة والتسليم بالكامل.",
    "apps.eyebrow": "الأرشيف",
    "apps.title": "كل التطبيقات",
    "apps.description": "كل ما أطلقته عبر المنصات والتجارة والذكاء الاصطناعي والموبايل.",
    "contact.eyebrow": "تواصل",
    "contact.title": "لنبنِ شيئاً سريعاً وجميلاً",
    "contact.description": "أخبرني عن الوظيفة أو المشروع — أرد خلال يوم واحد.",
    "contact.direct": "مباشر",
    "contact.basedIn": "مقيم في",
    "contact.availability": "متاح لوظائف بدوام كامل وعقود عمل وشراكات منتج طويلة المدى.",
    "contact.name": "الاسم",
    "contact.namePlaceholder": "اسمك",
    "contact.email": "البريد الإلكتروني",
    "contact.emailPlaceholder": "you@company.com",
    "contact.subject": "الموضوع",
    "contact.subjectPlaceholder": "ما موضوع الرسالة؟",
    "contact.message": "الرسالة",
    "contact.messagePlaceholder": "بضعة أسطر عن المشروع...",
    "contact.send": "إرسال الرسالة",
    "contact.sending": "جارٍ الإرسال...",
    "contact.sent": "تم إرسال الرسالة",
    "contact.sentDesc": "سأعود إليك خلال 24 ساعة.",
    "footer.tagline": "أبني منتجات ويب سريعة وسهلة الوصول.",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.built": "صُمّم وبُني باستخدام React و Tailwind CSS و Motion.",
    "project.back": "العودة إلى الأعمال",
    "project.demo": "عرض مباشر",
    "project.source": "الشيفرة المصدرية",
    "project.overview": "نظرة عامة",
    "project.role": "الدور",
    "project.duration": "المدة",
    "project.tech": "التقنيات",
    "project.features": "أبرز المزايا",
    "project.more": "مشاريع أخرى",
    "project.notFound": "المشروع غير موجود",
    "project.notFoundDesc": "دراسة الحالة هذه غير متوفرة.",
  },
} as const;

export type TranslationKey = keyof (typeof dict)["en"];

type LanguageValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang: setLangState,
      toggleLang: () => setLangState((l) => (l === "en" ? "ar" : "en")),
      t: (key) => dict[lang][key] ?? dict.en[key],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function useContent() {
  const { lang } = useLanguage();
  return useMemo(() => {
    const ar = lang === "ar";
    return {
      lang,
      profile: ar ? profileAr : profile,
      skills: skills.map((s) => ({ ...s, group: ar ? (skillGroupsAr[s.group] ?? s.group) : s.group })),
      stats: stats.map((s) => ({ ...s, label: ar ? (statLabelsAr[s.label] ?? s.label) : s.label })),
      experience: ar ? experienceAr : experience,
      testimonials: ar ? testimonialsAr : testimonials,
      projects: projects.map((p) => localizeProject(p, lang)),
      categoryLabel: (c: string) => (ar ? (categoryLabelsAr[c] ?? c) : c),
      localizeProject: (p: Project) => localizeProject(p, lang),
    };
  }, [lang]);
}
