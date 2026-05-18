import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/ProjectCard';
import TerminalSearch from '@/components/TerminalSearch';
import Pusher from 'pusher-js';
import SEO from '@/components/SEO';
import { useSearch } from '@/context/SearchContext';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  featured?: boolean;
}

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' as const } },
  exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.4, ease: 'easeIn' as const } },
};

const TypingEffect = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span style={{ color: '#10b981' }}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ color: '#2563eb' }}
      >
        _
      </motion.span>
    </span>
  );
};

// ─── About Section ────────────────────────────────────────────────
const AboutSection = () => (
  <section className="max-w-5xl mx-auto mb-24 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4 uppercase tracking-widest"
        style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', color: '#2563eb' }}
      >
        // ABOUT_ME
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: '#fff', letterSpacing: '-0.03em' }}>
        What I <span style={{ color: '#10b981' }}>actually</span> do
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div
          className="p-6 rounded-xl"
          style={{ background: 'rgba(2,6,23,0.65)', border: '1px solid rgba(16,185,129,0.18)' }}
        >
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            I'm a self-driven developer from Andhra Pradesh who obsesses over making things{' '}
            <span style={{ color: '#10b981' }}>automated, fast, and reliable</span>. I don't just build UIs
            — I build complete systems: backend APIs, mobile apps, browser automation, AI integrations, and CI/CD pipelines.
          </p>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            My projects span from a{' '}
            <span style={{ color: '#10b981' }}>React Native CLI SDUI streaming app</span> and a{' '}
            <span style={{ color: '#10b981' }}>high-frequency algo trading engine</span> on NSE/BSE with live Grafana
            dashboards, to a{' '}
            <span style={{ color: '#10b981' }}>WhatsApp AI bot</span> that bypasses detection using Groq LLM.
          </p>
          <p className="text-sm font-mono leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            What makes me different: I think in{' '}
            <span style={{ color: '#2563eb' }}>systems, not features</span>. Every project has a real problem it
            solved and an architecture designed to scale and survive edge cases.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Frontend / Mobile', tags: ['React', 'React Native CLI', 'Android Native', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Three.js', 'Svelte'], color: '#10b981' },
            { label: 'Backend / Infra', tags: ['Node.js', 'NestJS', 'Express', 'Prisma', 'PostgreSQL', 'Supabase', 'Socket.io', 'Redis', 'Firebase'], color: '#2563eb' },
            { label: 'Automation & AI', tags: ['Python', 'Playwright', 'Selenium', 'Groq AI', 'Gemini Flash', 'Llama 3', 'Stealth Mode', 'Web Scraping'], color: '#f59e0b' },
            { label: 'Tools & Platforms', tags: ['AWS', 'Vercel', 'Netlify', 'Cloudflare', 'Render', 'Railway', 'Docker', 'cloudflared', 'GitHub Actions', 'Grafana', 'Pusher', 'Cloudinary'], color: '#8b5cf6' },
          ].map((group) => (
            <div key={group.label}>
              <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: group.color }}>
                {group.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono"
                    style={{
                      background: `${group.color}10`,
                      border: `1px solid ${group.color}30`,
                      color: group.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

// ─── Contact Section ──────────────────────────────────────────────
const ContactSection = () => (
  <section className="max-w-4xl mx-auto mb-24 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center p-10 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(37,99,235,0.04))',
        border: '1px solid rgba(16,185,129,0.2)',
      }}
    >
      <div
        className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4 uppercase tracking-widest"
        style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}
      >
        ◆ AVAILABLE_FOR_HIRE
      </div>
      <h2 className="text-3xl font-bold mb-3" style={{ color: '#fff', letterSpacing: '-0.03em' }}>
        Let's build something.
      </h2>
      <p className="text-sm font-mono mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
        Open to full-time roles, freelance contracts, and interesting projects. Fast response guaranteed.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <motion.a
          href="https://wa.me/917842204844"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-mono text-sm font-bold"
          style={{ background: 'linear-gradient(135deg,#10b981,#2563eb)', color: '#020617' }}
        >
          ✉ WhatsApp +91 78422 04844
        </motion.a>
        <motion.a
          href="https://github.com/Saikumar-bali"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-mono text-sm"
          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}
        >
          ⌥ GitHub Profile
        </motion.a>
      </div>
    </motion.div>
  </section>
);

export default function Home() {
  const { searchTerm, setSearchTerm, selectedFilter, setSelectedFilter } = useSearch();
  const [projects, setProjects] = useState<Project[]>([]);
  const [metrics, setMetrics] = useState([
    'System Online', 'Uptime: 99.9%', 'Projects: 35+', 'API Latency: 12ms',
    'Automation Architect', 'Systems Engineer', 'Quantitative Developer', 'AI Integrator',
  ]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setProjects(data); })
      .catch((err) => console.error('Failed to fetch projects:', err));

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe('system-pulse');
    channel.bind('system-update', (data: { metric: string; value: string }) => {
      setMetrics((prev) => [`${data.metric}: ${data.value}`, ...prev.slice(0, 7)]);
    });
    return () => { pusher.unsubscribe('system-pulse'); };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter =
        selectedFilter === 'All' ||
        project.techStack.some((tech) => tech.toLowerCase().includes(selectedFilter.toLowerCase())) ||
        (selectedFilter === 'AI' && project.description.toLowerCase().includes('ai')) ||
        (selectedFilter === 'Mobile' && (
          project.techStack.some((t) => 
            t.toLowerCase().includes('react native') || 
            t.toLowerCase().includes('expo') || 
            t.toLowerCase().includes('kotlin') ||
            t.toLowerCase().includes('android')
          ) ||
          project.description.toLowerCase().includes('mobile') ||
          project.description.toLowerCase().includes('android')
        )) ||
        (selectedFilter === 'Automation' &&
          (project.description.toLowerCase().includes('automation') ||
            project.techStack.some((t) =>
              t.toLowerCase().includes('playwright') ||
              t.toLowerCase().includes('selenium') ||
              t.toLowerCase().includes('python')
            )));

      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, selectedFilter]);

  return (
    <>
      <SEO />
      <AnimatePresence mode="wait">
        <motion.div
          key="main-content"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 px-4 py-16 pb-24"
        >
          {/* ── Hero ─────────────────────────────────────────────── */}
          <section className="max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div
                className="inline-block px-4 py-2 mb-6 rounded-full text-xs font-mono"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  color: '#10b981',
                }}
              >
                ◆ AVAILABLE FOR HIRE — INDIA / REMOTE
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: '#fff' }}>
                <TypingEffect text="Saikumar Bali" />
              </h1>

              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Automation Architect · Systems Engineer · Quantitative Developer
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <motion.a
                  href="https://github.com/saikumar-bali"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded border border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40 hover:border-blue-500/50 transition-all flex items-center gap-2 group"
                >
                  <span className="text-blue-500 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">0x01</span>
                  <span className="text-slate-300 font-mono text-sm uppercase tracking-wider">GitHub Profile</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/917842204844"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded border border-slate-700/50 bg-slate-800/20 hover:bg-slate-800/40 hover:border-emerald-500/50 transition-all flex items-center gap-2 group"
                >
                  <span className="text-emerald-500 font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">0x02</span>
                  <span className="text-slate-300 font-mono text-sm uppercase tracking-wider">WhatsApp Direct</span>
                </motion.a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-8 mb-10">
                {[
                  { num: '20+', label: 'Projects Shipped' },
                  { num: '5+', label: 'Automation Bots' },
                  { num: '3', label: 'Live Mobile Apps' },
                  { num: '1', label: 'Algo Trading Engine' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{s.num}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="max-w-2xl mx-auto mt-4">
                <TerminalSearch
                  onSearch={setSearchTerm}
                  onFilter={setSelectedFilter}
                  selectedFilter={selectedFilter}
                  initialValue={searchTerm}
                />
              </div>
            </motion.div>
          </section>

          {/* ── About ────────────────────────────────────────────── */}
          <AboutSection />

          {/* ── Projects ─────────────────────────────────────────── */}
          <section className="max-w-5xl mx-auto mb-20">
            <div className="flex justify-between items-end mb-8">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold uppercase tracking-tighter"
                style={{ color: '#2563eb' }}
              >
                {'>'} deployed_infrastructure
              </motion.h2>
              <div className="text-xs font-mono text-slate-500">
                TOTAL_NODES: {filteredProjects.length}/{projects.length}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-500 font-mono italic">
                  {'>'} Loading secure modules...
                </div>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <Link to={`/project/${project.slug}`} key={project.id}>
                    <ProjectCard {...project} index={index} />
                  </Link>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <div className="text-4xl mb-4">⚠️</div>
                  <h3 className="text-xl font-mono mb-2" style={{ color: '#ef4444' }}>
                    [ERROR]: 404_PROJECT_NOT_FOUND
                  </h3>
                  <p className="text-slate-500 font-mono text-sm">
                    Search query "{searchTerm}" returned no active nodes in sector "{selectedFilter}".
                  </p>
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedFilter('All'); }}
                    className="mt-6 px-4 py-2 rounded border border-emerald-500/30 text-emerald-500 text-xs font-mono hover:bg-emerald-500/10 transition-all"
                  >
                    {'>'} RESET_QUERY_PARAMETERS
                  </button>
                </motion.div>
              )}
            </div>
          </section>

          {/* ── Contact ──────────────────────────────────────────── */}
          <ContactSection />
        </motion.div>
      </AnimatePresence>

      {/* ── Metrics Ticker ───────────────────────────────────────── */}
      <AnimatePresence>
        <motion.div
          key="metrics-ticker"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed bottom-0 left-0 right-0 py-3 overflow-hidden z-50"
          style={{
            background: 'rgba(2,6,23,0.95)',
            borderTop: '1px solid rgba(16,185,129,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex' }}
          >
            {[...metrics, ...metrics].map((metric, i) => (
              <span
                key={i}
                className="text-xs font-mono uppercase"
                style={{ color: i % 2 === 0 ? '#10b981' : '#2563eb' }}
              >
                ◆ {metric}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
