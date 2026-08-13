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
    "nav.language": "التبديل إلى اللغة الإنجليزية",
    "hero.badge": "متاح للعمل بدوام كامل أو ضمن مشاريع تعاقدية",
    "hero.lead":
      "مهندس حاسوب متخصّص في تطوير الويب المتكامل. أصمّم وأبني منصّات ويب متكاملة بشيفرة صارمة الأنواع، ومغطّاة بالاختبارات، ومُحسَّنة لأزمنة تحميل أقل من ثانية.",
    "hero.cta1": "استعراض الأعمال المختارة",
    "hero.cta2": "التواصل معي",
    "hero.scroll": "الانتقال إلى قسم النبذة",
    "about.eyebrow": "نبذة عني",
    "about.title": "منهجية هندسية دقيقة وحِسّ تصميمي متقن.",
    "about.graduated": "تخرّج بمرتبة الشرف",
    "about.open": "منفتح على العمل الهجين والعمل عن بُعد",
    "about.currently": "أعمل حالياً على",
    "about.building": "أطوّر",
    "about.buildingText": "منصّة تحليلات تعتمد المعالجة التدفّقية في شركة نورث لايت لابز",
    "about.learning": "أدرس",
    "about.learningText": "الأنظمة الموزّعة ولغة Rust لتطبيقات الحوسبة الطرفية",
    "about.writing": "أكتب",
    "about.writingText": "مقالات تقنية عن مؤشّرات الأداء الأساسية للويب والعرض من الحافة",
    "skills.eyebrow": "الكفاءات التقنية",
    "skills.title": "التقنيات التي أعمل بها يومياً",
    "skills.description":
      "منظومة أدوات متكاملة قائمة على أمان الأنواع، وميزانيات أداء محدّدة، وأنظمة برمجية قابلة للتوسّع والصيانة.",
    "stack.eyebrow": "المنظومة التقنية",
    "stack.title": "حزمة التقنيات المستخدمة",
    "stack.description": "الأدوات التي أعتمد عليها في بناء أنظمة برمجية جاهزة للتشغيل الفعلي.",
    "exp.eyebrow": "المسيرة المهنية",
    "exp.title": "الخط الزمني للخبرة العملية",
    "exp.description":
      "من الدراسة الأكاديمية في هندسة الحاسوب إلى أنظمة إنتاجية يستخدمها عشرات الآلاف يومياً.",
    "testimonials.eyebrow": "شهادات",
    "testimonials.title": "آراء من عملت معهم",
    "testimonials.description": "ملاحظات من الفرق التي شاركتها بناء المنتجات.",
    "work.eyebrow": "أعمال مختارة",
    "work.title": "مشاريع بارزة",
    "work.description":
      "ثلاثة منتجات تولّيت فيها تصميم المعمارية وبناء الواجهة وإدارة التسليم من البداية إلى النهاية.",
    "apps.eyebrow": "الأرشيف",
    "apps.title": "جميع التطبيقات",
    "apps.description":
      "مجموعة الأعمال المنجزة في مجالات المنصّات والتجارة الإلكترونية والذكاء الاصطناعي وتطبيقات الهواتف.",
    "contact.eyebrow": "التواصل",
    "contact.title": "لنبنِ معاً منتجاً سريعاً ومتقن التصميم",
    "contact.description": "أخبرني بتفاصيل الوظيفة أو المشروع، وسأرد عليك خلال يوم عمل واحد.",
    "contact.direct": "تواصل مباشر",
    "contact.basedIn": "مقرّ الإقامة",
    "contact.availability":
      "متاح للوظائف بدوام كامل، والمشاريع التعاقدية، والشراكات طويلة الأمد في بناء المنتجات.",
    "contact.name": "الاسم",
    "contact.namePlaceholder": "اكتب اسمك",
    "contact.email": "البريد الإلكتروني",
    "contact.emailPlaceholder": "you@company.com",
    "contact.subject": "الموضوع",
    "contact.subjectPlaceholder": "ما موضوع رسالتك؟",
    "contact.message": "نص الرسالة",
    "contact.messagePlaceholder": "اكتب نبذة موجزة عن المشروع أو الفرصة...",
    "contact.send": "إرسال الرسالة",
    "contact.sending": "جارٍ الإرسال...",
    "contact.sent": "تم إرسال رسالتك بنجاح",
    "contact.sentDesc": "سأتواصل معك خلال 24 ساعة.",
    "footer.tagline": "أبني منتجات ويب سريعة الأداء وسهلة الوصول للجميع.",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.built": "صُمّم وطُوِّر باستخدام React و Tailwind CSS و Motion.",
    "project.back": "العودة إلى الأعمال",
    "project.demo": "عرض تجريبي مباشر",
    "project.source": "الشيفرة المصدرية",
    "project.overview": "نظرة عامة",
    "project.role": "الدور في المشروع",
    "project.duration": "مدة التنفيذ",
    "project.tech": "التقنيات المستخدمة",
    "project.features": "أبرز الخصائص",
    "project.more": "مشاريع أخرى",
    "project.notFound": "المشروع غير موجود",
    "project.notFoundDesc": "دراسة الحالة المطلوبة غير متوفّرة.",

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
