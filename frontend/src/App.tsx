import { motion, type Variants } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import {
  Github, Linkedin, Mail,
  ArrowUpRight, Target, Code,
  ExternalLink, BookOpen, GraduationCap, Briefcase, Globe, FileText, Star, Settings
} from 'lucide-react';
import JuliaBackground from './components/FractaleBackground';

// Easing professionnel
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Animation pour les éléments au scroll (below the fold)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

// Container avec stagger pour les sections au scroll
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Items du stagger pour les sections au scroll
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

// Types
interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
  accent?: boolean;
  delay?: number;
  noAnimation?: boolean;
}

interface ProjectCardProps {
  title: string;
  desc: string;
  icon: string;
  stack: string[];
  link?: string;
}

interface TimelineItemProps {
  date: string;
  title: string;
  organization: string;
  description?: string;
  dashed?: boolean;
}

interface TechSectionProps {
  title: string;
  items: { name: string; logo: string; color: string }[];
}

// Composant Bento Card
const BentoItem = ({ children, className = "", colSpan = "col-span-1", rowSpan = "", accent = false, delay = 0, noAnimation = false }: BentoItemProps) => (
  <motion.div
    initial={noAnimation ? false : { opacity: 0, y: 20 }}
    whileInView={noAnimation ? undefined : { opacity: 1, y: 0 }}
    viewport={noAnimation ? undefined : { once: true, margin: "-50px" }}
    transition={noAnimation ? undefined : { duration: 0.5, ease: smoothEase, delay: delay * 0.1 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={`
      ${colSpan} ${rowSpan}
      ${accent ? 'bento-card-accent rounded-3xl' : 'bento-card'}
      ${className}
    `}
  >
    <div className="relative z-10 h-full p-6 md:p-8 flex flex-col">
      {children}
    </div>
  </motion.div>
);

// Badge Tech avec shields.io
const TechBadge = ({ name, logo, color }: { name: string; logo: string; color: string }) => (
  <img
    src={`https://img.shields.io/badge/${name}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`}
    alt={name}
    className="h-6 hover:scale-105 transition-transform"
  />
);

// Section Tech
const TechSection = ({ title, items }: TechSectionProps) => (
  <div className="mb-4 last:mb-0">
    <h3 className="text-xs font-bold text-royal-500 uppercase tracking-wider mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((tech, i) => (
        <TechBadge key={i} {...tech} />
      ))}
    </div>
  </div>
);

// Carte Projet
const ProjectCard = ({ title, desc, icon, stack, link }: ProjectCardProps) => (
  <motion.a
    href={link || "#"}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    className="group block bento-card p-6"
  >
    <div className="flex justify-between items-start mb-4">
      <span className="text-3xl">{icon}</span>
      <ExternalLink className="text-ink-light group-hover:text-royal-500 transition-colors" size={18} />
    </div>
    <h3 className="text-xl font-bold text-ink-dark mb-2 group-hover:text-royal-600 transition-colors">{title}</h3>
    <p className="text-ink-light text-sm mb-4 leading-relaxed">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {stack.map((s, i) => (
        <span key={i} className="text-xs text-royal-500 font-medium bg-royal-50 px-2 py-1 rounded-lg">#{s}</span>
      ))}
    </div>
  </motion.a>
);

// Timeline Item
const TimelineItem = ({ date, title, organization, description, dashed = false }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: 15 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="relative pl-8 pb-8 last:pb-0"
  >
    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 bg-emerald-500 border-emerald-300" />
    <div
      className={`absolute left-[7px] top-5 w-0.5 h-full last:hidden ${dashed ? 'border-l-2 border-dashed border-emerald-300 bg-transparent' : 'bg-emerald-200'}`}
    />
    <span className="text-xs font-semibold text-emerald-600">{date}</span>
    <h4 className="text-lg font-bold text-ink-dark mt-1">{title}</h4>
    <p className="text-ink-medium font-medium">{organization}</p>
    {description && <p className="text-ink-light text-sm mt-1">{description}</p>}
  </motion.div>
);

// Language Switch Component
const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('fr') ? 'fr' : 'en';

  const toggleLanguage = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-sm text-ink-medium hover:text-royal-500 transition-colors"
      aria-label="Switch language"
    >
      <Globe size={16} />
      <span className="font-medium">{currentLang.toUpperCase()}</span>
    </button>
  );
};

// Application principale
function App() {
  const { t } = useTranslation();

  const projects = [
    {
      icon: "🏝️",
      titleKey: "projects.items.travelagent.title",
      descKey: "projects.items.travelagent.desc",
      stack: ["LangChain", "LangGraph", "ColPali", "Qdrant", "FastAPI", "Python"],
      link: "https://github.com/lylianchallier/Lyliagent"
    },
    {
      icon: "⚗️",
      titleKey: "projects.items.turbulence.title",
      descKey: "projects.items.turbulence.desc",
      stack: ["PySINDy", "PyKAN", "Python"],
      link: "https://github.com/lylianchallier/symboliConvection"
    },
    {
      icon: "🌇",
      titleKey: "projects.items.vae.title",
      descKey: "projects.items.vae.desc",
      stack: ["PyTorch", "Streamlit", "Python"],
      link: "https://github.com/lylianchallier/VAEs"
    },
    {
      icon: "🌊",
      titleKey: "projects.items.yolov11.title",
      descKey: "projects.items.yolov11.desc",
      stack: ["YOLOv11", "RoboFlow", "Python"],
      link: "https://github.com/lylianchallier/"
    },
    {
      icon: "⚡️",
      titleKey: "projects.items.edf.title",
      descKey: "projects.items.edf.desc",
      stack: ["PyTorch", "Dragon-AutoDL", "Python"],
      link: "https://github.com/lylianchallier/ElectricDemandeForecasting"
    },
    {
      icon: "🏰",
      titleKey: "projects.items.versailles.title",
      descKey: "projects.items.versailles.desc",
      stack: ["LangChain", "LangGraph", "Python"],
      link: "https://github.com/lylianchallier/Vers-AI-lles"
    }
  ];

  const techSections = {
    languages: [
      { name: "Python", logo: "python", color: "3776AB" },
      { name: "R", logo: "r", color: "276DC3" },
      { name: "SQL", logo: "postgresql", color: "336791" },
      { name: "TypeScript", logo: "typescript", color: "3178C6" },
    ],
    devops: [
      { name: "Git", logo: "git", color: "F05032" },
      { name: "Linux", logo: "linux", color: "FCC624" },
    ],
    aiml: [
      { name: "ColPali", logo: "huggingface", color: "FFD21E" },
      { name: "LangChain", logo: "langchain", color: "1C3C3C" },
      { name: "LangGraph", logo: "langchain", color: "1C3C3C" },
      { name: "NumPy", logo: "numpy", color: "013243" },
      { name: "Pandas", logo: "pandas", color: "150458" },
      { name: "PydanticAI", logo: "pydantic", color: "E92063" },
      { name: "PyTorch", logo: "pytorch", color: "EE4C2C" },
      { name: "Scikit--learn", logo: "scikit-learn", color: "F7931E" },
      { name: "Transformers", logo: "huggingface", color: "FFD21E" },
      { name: "YOLOv11", logo: "yolo", color: "00FFFF" },
    ],
    prototyping: [
      { name: "Django", logo: "django", color: "092E20" },
      { name: "Docker", logo: "docker", color: "2496ED" },
      { name: "Elasticsearch", logo: "elasticsearch", color: "005571" },
      { name: "FastAPI", logo: "fastapi", color: "009688" },
      { name: "PostgreSQL", logo: "postgresql", color: "336791" },
      { name: "Qdrant", logo: "qdrant", color: "DC244C" },
      { name: "React", logo: "react", color: "61DAFB" },
      { name: "Streamlit", logo: "streamlit", color: "FF4B4B" },
      { name: "Vite", logo: "vite", color: "646CFF" },
    ],
  };

  return (
    <div className="min-h-screen font-poppins relative">
      {/* Fond Julia interactif */}
      <JuliaBackground />

      {/* Navbar flottante */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-xl border-2 border-royal-600 rounded-full px-6 py-3 flex items-center gap-6 shadow-bento"
        >
          <a href="#" className="font-bold text-ink-dark hover:text-royal-500 transition-colors">{t('nav.home')}</a>
          <a href="#projets" className="text-sm text-ink-medium hover:text-royal-500 transition-colors">{t('nav.projects')}</a>
          <a href="#parcours" className="text-sm text-ink-medium hover:text-royal-500 transition-colors">{t('nav.journey')}</a>
          <a href="#blog" className="text-sm text-ink-medium hover:text-royal-500 transition-colors">{t('nav.blog')}</a>
          <div className="w-px h-4 bg-royal-200" />
          <LanguageSwitch />
          <a href="https://www.linkedin.com/in/lylian-challier" className="text-sm text-ink-dark font-medium hover:text-royal-500 transition-colors">
            {t('nav.contact')}
          </a>
        </motion.div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pt-32 pb-20 relative z-10">

        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-end">
            {/* Bio */}
            <div className="flex-1">
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
              >
                {t('hero.greeting')}{' '}
                <span className="text-white">{t('hero.name')}</span>
              </h1>

              <p
                className="text-white text-lg md:text-xl leading-relaxed"
              >
                <Trans i18nKey="hero.description">
                  MSc student at <span className="font-semibold text-royal-300">CentraleSupelec</span>, specialized in mathematics, AI, machine learning and deep learning, applying for a 6 month experience starting March 2026 as a step toward a future industrial PhD.
                </Trans>
              </p>

              <p
                className="text-white text-base md:text-lg leading-relaxed mt-4"
              >
                <Trans i18nKey="hero.subdescription">
                  This year I was selected for the <span className="font-medium text-white">Digital Tech Year</span> selective track, an innovation program, and awarded the <span className="font-medium text-white">MathTech Gap Year fellowship</span> (4 laureates, FMJH). This experience bridges real-world AI innovation with my PhD-oriented research goals.
                </Trans>
              </p>
            </div>

            {/* Carte Contact */}
            <div
              className="bento-card p-6 mt-8 lg:mt-0 lg:w-64 lg:shrink-0"
            >
              <h3 className="text-xs font-bold text-royal-500 uppercase tracking-wider mb-4">{t('contact.title')}</h3>
              <div className="flex flex-col gap-3">
                <a href="mailto:lylian.challier@student-cs.fr" className="flex items-center gap-3 text-ink-medium hover:text-royal-500 transition-colors group">
                  <div className="p-2 bg-royal-50 rounded-lg group-hover:bg-royal-100 transition-colors">
                    <Mail size={16} className="text-royal-500" />
                  </div>
                  <span className="text-sm font-medium">{t('contact.email')}</span>
                </a>
                <a href="https://linkedin.com/in/lylian-challier" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-medium hover:text-royal-500 transition-colors group">
                  <div className="p-2 bg-royal-50 rounded-lg group-hover:bg-royal-100 transition-colors">
                    <Linkedin size={16} className="text-royal-500" />
                  </div>
                  <span className="text-sm font-medium">{t('contact.linkedin')}</span>
                </a>
                <a href="https://github.com/lylianchallier" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-medium hover:text-royal-500 transition-colors group">
                  <div className="p-2 bg-royal-50 rounded-lg group-hover:bg-royal-100 transition-colors">
                    <Github size={16} className="text-royal-500" />
                  </div>
                  <span className="text-sm font-medium">{t('contact.github')}</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid Principal */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 auto-rows-[180px]">

          {/* Grande carte: Projet Star */}
          <BentoItem colSpan="md:col-span-2" rowSpan="md:row-span-2" noAnimation>
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-royal-500/10 rounded-xl flex items-center justify-center">
                    <Star className="text-royal-500" size={20} />
                  </div>
                  <span className="text-xs font-bold text-royal-500 uppercase tracking-wider">Featured Project</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-ink-dark mb-3">{t('starProject.title')}</h2>
                <p className="text-ink-medium leading-relaxed text-sm">
                  {t('starProject.desc')}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["LangChain", "LangGraph", "Python", "RAG"].map((tag, i) => (
                    <span key={i} className="text-xs text-royal-500 font-medium bg-royal-50 px-2 py-1 rounded-lg">#{tag}</span>
                  ))}
                </div>
              </div>
              <a
                href="https://github.com/lylianchallier"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-royal-500 font-medium hover:text-royal-600 transition-colors mt-4"
              >
                {t('starProject.viewProject')}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </BentoItem>

          {/* Carte Projet en cours */}
          <BentoItem noAnimation>
            <a
              href="https://github.com/lylianchallier"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Code size={14} className="text-royal-500" />
                  <span className="text-xs font-bold text-royal-500 uppercase tracking-wider">{t('activity.title')}</span>
                </div>
                <h3 className="font-bold text-ink-dark text-lg group-hover:text-royal-600 transition-colors">{t('starProject.title')}</h3>
              </div>
              <p className="text-ink-medium text-sm leading-relaxed line-clamp-3">
                {t('starProject.desc')}
              </p>
              <div className="flex items-center gap-1 text-ink-dark group-hover:text-royal-500 transition-colors text-sm font-medium">
                <Github size={14} />
                <span>GitHub</span>
                <ArrowUpRight size={14} />
              </div>
            </a>
          </BentoItem>

          {/* Carte Dernier Article Blog */}
          <BentoItem colSpan="md:col-span-1" rowSpan="md:row-span-2" noAnimation>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={16} className="text-royal-500" />
                <h3 className="text-xs font-bold text-royal-500 uppercase tracking-wider">{t('blog.title')}</h3>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs text-ink-light mb-1">{t('blog.latestPost.date')}</span>
                <h4 className="text-lg font-bold text-ink-dark mb-2 leading-tight">{t('blog.latestPost.title')}</h4>
                <p className="text-ink-light text-sm leading-relaxed">{t('blog.latestPost.excerpt')}</p>
              </div>
              <a
                href="#blog"
                className="inline-flex items-center gap-1 text-royal-500 font-medium text-sm hover:text-royal-600 transition-colors mt-3"
              >
                {t('blog.readMore')}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </BentoItem>

          {/* Carte Objectif */}
          <BentoItem accent noAnimation>
            <div className="flex flex-col justify-center items-center h-full text-center">
              <div className="flex items-center gap-2 mb-2">
                <Target size={14} className="text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">{t('goal.label')}</span>
              </div>
              <span className="text-lg text-white font-bold">{t('goal.title')}</span>
              <span className="text-sm text-white font-medium mt-1">{t('goal.date')}</span>
            </div>
          </BentoItem>

        </section>

        {/* Section Stack Technique */}
        <section className="mb-16">
          <div className="bento-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-royal-500" size={24} />
              <h2 className="text-2xl font-bold text-ink-dark">{t('tech.title')}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <TechSection title={t('tech.languages')} items={techSections.languages} />
                <TechSection title={t('tech.devops')} items={techSections.devops} />
              </div>
              <TechSection title={t('tech.aiml')} items={techSections.aiml} />
              <TechSection title={t('tech.prototyping')} items={techSections.prototyping} />
            </div>
          </div>
        </section>

        {/* Section Projets */}
        <section id="projets" className="mb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <BookOpen className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">{t('projects.title')}</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project, i) => (
              <motion.div key={i} variants={staggerItem}>
                <ProjectCard
                  icon={project.icon}
                  title={t(project.titleKey)}
                  desc={t(project.descKey)}
                  stack={project.stack}
                  link={project.link}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Section Timeline Parcours */}
        <section id="parcours" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <GraduationCap className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">{t('journey.title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Timeline Academique */}
            <div className="bento-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-emerald-500" size={22} />
                <h3 className="text-xl font-bold text-ink-dark">{t('journey.education')}</h3>
              </div>
              <div className="space-y-2">
                <TimelineItem
                  date={t('journey.items.licence.date')}
                  title={t('journey.items.licence.title')}
                  organization={t('journey.items.licence.org')}
                  description={t('journey.items.licence.desc')}
                />
                <TimelineItem
                  date={t('journey.items.exchange.date')}
                  title={t('journey.items.exchange.title')}
                  organization={t('journey.items.exchange.org')}
                  description={t('journey.items.exchange.desc')}
                />
                <TimelineItem
                  date={t('journey.items.m1.date')}
                  title={t('journey.items.m1.title')}
                  organization={t('journey.items.m1.org')}
                  description={t('journey.items.m1.desc')}
                />
                <TimelineItem
                  date={t('journey.items.dty.date')}
                  title={t('journey.items.dty.title')}
                  organization={t('journey.items.dty.org')}
                  description={t('journey.items.dty.desc')}
                  dashed
                />
                <TimelineItem
                  date={t('journey.items.m2.date')}
                  title={t('journey.items.m2.title')}
                  organization={t('journey.items.m2.org')}
                  description={t('journey.items.m2.desc')}
                  dashed
                />
              </div>
            </div>

            {/* Timeline Professionnelle */}
            <div className="bento-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-emerald-500" size={22} />
                <h3 className="text-xl font-bold text-ink-dark">{t('journey.experience')}</h3>
              </div>
              <div className="space-y-2">
                <TimelineItem
                  date={t('journey.items.lisn.date')}
                  title={t('journey.items.lisn.title')}
                  organization={t('journey.items.lisn.org')}
                  description={t('journey.items.lisn.desc')}
                />
                <TimelineItem
                  date={t('journey.items.renaultgroup.date')}
                  title={t('journey.items.renaultgroup.title')}
                  organization={t('journey.items.renaultgroup.org')}
                  description={t('journey.items.renaultgroup.desc')}
                />
                <TimelineItem
                  date={t('journey.items.bnf.date')}
                  title={t('journey.items.bnf.title')}
                  organization={t('journey.items.bnf.org')}
                  description={t('journey.items.bnf.desc')}
                />
                <TimelineItem
                  date={t('journey.items.matmut.date')}
                  title={t('journey.items.matmut.title')}
                  organization={t('journey.items.matmut.org')}
                  description={t('journey.items.matmut.desc')}
                />
                <TimelineItem
                  date={t('journey.items.horama.date')}
                  title={t('journey.items.horama.title')}
                  organization={t('journey.items.horama.org')}
                  description={t('journey.items.horama.desc')}
                  dashed
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA Contact */}
        <section className="mb-8">
          <div className="bento-card-accent rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <a
              href="https://linkedin.com/in/lylian-challier"
              target="_blank"
              className="cta-button inline-flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-full hover:bg-royal-50 transition-colors"
            >
              {t('cta.button')}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center border-t border-white/10 bg-black/30 backdrop-blur-md">
        <p className="text-white/60 text-sm">
          {t('footer.copyright')}
        </p>
      </footer>

    </div>
  );
}

export default App;
