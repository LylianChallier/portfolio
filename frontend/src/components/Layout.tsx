import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import FractaleBackground from './FractaleBackground';

// Language Switch Component
const LanguageSwitch = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('fr') ? 'fr' : 'en';

  const toggleLanguage = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-1.5 text-sm text-ink-medium hover:text-royal-500 transition-colors ${className}`}
      aria-label="Switch language"
    >
      <Globe size={16} />
      <span className="font-medium">{currentLang.toUpperCase()}</span>
    </button>
  );
};

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-72 bg-white/95 backdrop-blur-xl z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end mb-8">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-royal-50 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-ink-dark" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                <Link to="/" onClick={onClose} className="text-lg font-bold text-ink-dark hover:text-royal-500 transition-colors py-2">
                  {t('nav.home')}
                </Link>
                <a href="/#projets" onClick={onClose} className="text-lg text-ink-medium hover:text-royal-500 transition-colors py-2">
                  {t('nav.projects')}
                </a>
                <a href="/#parcours" onClick={onClose} className="text-lg text-ink-medium hover:text-royal-500 transition-colors py-2">
                  {t('nav.journey')}
                </a>
                <Link to="/blog" onClick={onClose} className="text-lg text-ink-medium hover:text-royal-500 transition-colors py-2">
                  {t('nav.blog')}
                </Link>
                <a href="mailto:lylian.challier@student-cs.fr" onClick={onClose} className="text-lg text-ink-dark font-medium hover:text-royal-500 transition-colors py-2">
                  {t('nav.contact')}
                </a>
              </nav>
              <div className="mt-auto pt-6 border-t border-royal-100">
                <LanguageSwitch className="py-2" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Navbar Component
const Navbar = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto max-w-xl">
        {/* Desktop Navigation */}
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="hidden md:flex bg-white/90 backdrop-blur-xl border-2 border-royal-600 rounded-full px-6 py-3 items-center gap-6 shadow-bento"
        >
          <Link to="/" className={`font-bold hover:text-royal-500 transition-colors ${isHome ? 'text-royal-500' : 'text-ink-dark'}`}>
            {t('nav.home')}
          </Link>
          <a href="/#projets" className="text-sm text-ink-medium hover:text-royal-500 transition-colors">
            {t('nav.projects')}
          </a>
          <a href="/#parcours" className="text-sm text-ink-medium hover:text-royal-500 transition-colors">
            {t('nav.journey')}
          </a>
          <Link to="/blog" className={`text-sm hover:text-royal-500 transition-colors ${location.pathname === '/blog' ? 'text-royal-500 font-medium' : 'text-ink-medium'}`}>
            {t('nav.blog')}
          </Link>
          <a href="mailto:lylian.challier@student-cs.fr" className="text-sm text-ink-dark font-medium hover:text-royal-500 transition-colors">
            {t('nav.contact')}
          </a>
          <div className="w-px h-4 bg-royal-200" />
          <LanguageSwitch />
        </motion.div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="flex md:hidden bg-white/90 backdrop-blur-xl border-2 border-royal-600 rounded-full px-4 py-2.5 items-center justify-between shadow-bento"
        >
          <Link to="/" className="font-bold text-ink-dark text-sm flex items-center">
            {t('nav.home')}
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 hover:bg-royal-50 rounded-full transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-ink-dark" />
            </button>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

// Footer Component
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 py-8 md:py-10 text-center border-t border-white/10 bg-black/30 backdrop-blur-md px-4">
      <p className="text-white/60 text-xs sm:text-sm">
        {t('footer.copyright')}
      </p>
    </footer>
  );
};

// Layout Component
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen font-poppins relative">
      <FractaleBackground />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
