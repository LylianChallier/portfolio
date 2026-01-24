import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, FileText, ArrowUpRight } from 'lucide-react';
import Layout from '../components/Layout';


// Blog themes/categories
const themes = [
  { id: 'all', labelFr: 'Tous', labelEn: 'All' },
  { id: 'ai', labelFr: 'IA & ML', labelEn: 'AI & ML' },
  { id: 'dev', labelFr: 'Dev', labelEn: 'Dev' },
  { id: 'research', labelFr: 'Recherche', labelEn: 'Research' },
  { id: 'tutorials', labelFr: 'Tutoriels', labelEn: 'Tutorials' },
];

// Mock blog posts
const blogPosts = [
  {
    id: 1,
    title: "Introduction aux Transformers",
    titleEn: "Introduction to Transformers",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    theme: 'ai',
    date: '2025-01-15',
    readTime: '8 min',
  },
  {
    id: 2,
    title: "Optimisation de modèles avec PyTorch",
    titleEn: "Model Optimization with PyTorch",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    theme: 'ai',
    date: '2025-01-10',
    readTime: '12 min',
  },
  {
    id: 3,
    title: "React Server Components",
    titleEn: "React Server Components",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    theme: 'dev',
    date: '2025-01-05',
    readTime: '6 min',
  },
  {
    id: 4,
    title: "RAG: Retrieval Augmented Generation",
    titleEn: "RAG: Retrieval Augmented Generation",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    theme: 'ai',
    date: '2024-12-28',
    readTime: '15 min',
  },
  {
    id: 5,
    title: "Mon expérience en recherche au LISN",
    titleEn: "My Research Experience at LISN",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    theme: 'research',
    date: '2024-12-20',
    readTime: '10 min',
  },
  {
    id: 6,
    title: "Guide: Créer un agent LangChain",
    titleEn: "Guide: Building a LangChain Agent",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.",
    theme: 'tutorials',
    date: '2024-12-15',
    readTime: '20 min',
  },
  {
    id: 7,
    title: "Tailwind CSS: Astuces avancées",
    titleEn: "Tailwind CSS: Advanced Tips",
    description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    theme: 'dev',
    date: '2024-12-10',
    readTime: '7 min',
  },
  {
    id: 8,
    title: "Vision transformers pour la détection",
    titleEn: "Vision Transformers for Detection",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    theme: 'research',
    date: '2024-12-05',
    readTime: '14 min',
  },
  {
    id: 9,
    title: "Déployer une API FastAPI sur Docker",
    titleEn: "Deploy a FastAPI API on Docker",
    description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis.",
    theme: 'tutorials',
    date: '2024-11-28',
    readTime: '11 min',
  },
];

// Blog Card Component
interface BlogCardProps {
  title: string;
  description: string;
  theme: string;
  date: string;
  readTime: string;
}

const BlogCard = ({ title, description, theme, date, readTime }: BlogCardProps) => {
  const themeColors: Record<string, string> = {
    ai: 'bg-purple-100 text-purple-600',
    dev: 'bg-blue-100 text-blue-600',
    research: 'bg-emerald-100 text-emerald-600',
    tutorials: 'bg-orange-100 text-orange-600',
  };

  return (
    <motion.article
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bento-card p-5 sm:p-6 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${themeColors[theme] || 'bg-gray-100 text-gray-600'}`}>
          {theme.toUpperCase()}
        </span>
        <span className="text-xs text-ink-light">{readTime}</span>
      </div>
      <h3 className="text-lg font-bold text-ink-dark mb-2 group-hover:text-royal-600 transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="text-ink-light text-sm leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-light">{date}</span>
        <span className="flex items-center gap-1 text-royal-500 text-sm font-medium group-hover:text-royal-600 transition-colors">
          Lire
          <ArrowUpRight size={14} />
        </span>
      </div>
    </motion.article>
  );
};

// Blog Page Component
const Blog = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');

  const isEnglish = i18n.language.startsWith('en');

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = (isEnglish ? post.titleEn : post.title)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTheme = selectedTheme === 'all' || post.theme === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  return (
    <Layout>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-16 md:pb-20 relative z-10">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileText className="text-white" size={24} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {t('blog.title')}
            </h1>
          </div>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl">
            {isEnglish
              ? 'Thoughts on AI, machine learning, and software development.'
              : 'Reflexions sur l\'IA, le machine learning et le developpement logiciel.'}
          </p>
        </header>

        {/* Search and Filters */}
        <div className="bento-card p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" size={18} />
              <input
                type="text"
                placeholder={isEnglish ? 'Search articles...' : 'Rechercher des articles...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-royal-50/50 border border-royal-100 rounded-xl text-ink-dark placeholder-ink-light focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Theme Filters */}
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(
                    selectedTheme === theme.id && theme.id !== 'all' ? 'all' : theme.id
                  )}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedTheme === theme.id
                      ? 'bg-royal-600 text-white ring-2 ring-royal-400'
                      : 'bg-royal-50 text-ink-medium hover:bg-royal-100'
                  }`}
                >
                  {isEnglish ? theme.labelEn : theme.labelFr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={isEnglish ? post.titleEn : post.title}
              description={post.description}
              theme={post.theme}
              date={post.date}
              readTime={post.readTime}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="bento-card p-12 text-center">
            <p className="text-ink-light text-lg">
              {isEnglish ? 'No articles found.' : 'Aucun article trouve.'}
            </p>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Blog;
