import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, GitBranch, Terminal, Eye } from 'lucide-react';
import SEO from '@/components/SEO';

interface Metric { label: string; value: string }
interface DeepDive {
  why?: string;
  challenge?: string;
  architecture?: string;
  automation?: string;
  monitoring?: string;
}
interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshotUrl?: string;
  screenshots?: string[];
  viewCount?: number;
  deepDive?: DeepDive;
  metrics?: Metric[];
  featured?: boolean;
}

const SectionBlock = ({ label, content }: { label: string; content: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <div
      className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest mb-3"
      style={{ color: '#2563eb' }}
    >
      <span style={{ color: '#10b981' }}>◆</span>
      {label}
    </div>
    <div
      className="p-5 rounded-xl text-sm font-mono leading-relaxed whitespace-pre-wrap"
      style={{
        background: 'rgba(0,0,0,0.35)',
        border: '1px solid rgba(16,185,129,0.12)',
        color: 'rgba(255,255,255,0.72)',
      }}
    >
      {content}
    </div>
  </motion.div>
);

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    fetch(`/api/project?slug=${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Project not found');
        return res.json();
      })
      .then((data) => { setProject(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });

    // Track view
    fetch('/api/project-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-center"
      >
        <div className="text-2xl font-mono mb-2" style={{ color: '#10b981' }}>
          {'>'} Loading case study...
        </div>
        <div className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
          DECRYPTING_MODULE: {slug}
        </div>
      </motion.div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-4xl">⚠️</div>
      <h2 className="text-xl font-mono" style={{ color: '#ef4444' }}>
        [ERROR]: PROJECT_NODE_NOT_FOUND
      </h2>
      <p className="text-sm font-mono text-slate-500">{error}</p>
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 rounded border border-emerald-500/30 text-emerald-500 text-xs font-mono hover:bg-emerald-500/10 transition-all"
      >
        <ArrowLeft size={14} /> Return to root
      </Link>
    </div>
  );

  const screenshots = project.screenshots?.filter(Boolean) ?? [];
  const deepDive = project.deepDive as DeepDive | null;
  const metrics = (project.metrics ?? []) as Metric[];

  return (
    <>
      <SEO
        title={project.title}
        description={project.description}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 py-10 pb-28"
      >
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-emerald-400 transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <ArrowLeft size={14} />
            Back to projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {project.featured && (
            <div
              className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4 uppercase tracking-widest"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}
            >
              ◆ Featured Project
            </div>
          )}
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <h1
              className="text-3xl md:text-4xl font-bold"
              style={{ color: '#fff', letterSpacing: '-0.03em' }}
            >
              {project.title}
            </h1>
            {project.viewCount !== undefined && (
              <div
                className="flex items-center gap-1.5 text-xs font-mono"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                <Eye size={12} />
                {project.viewCount} views
              </div>
            )}
          </div>
          <p
            className="text-sm font-mono leading-relaxed max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider"
              style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#34d399',
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Metrics Row */}
        {metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          >
            {metrics.map((m: Metric) => (
              <div
                key={m.label}
                className="p-3 rounded-lg text-center"
                style={{ background: 'rgba(2,6,23,0.7)', border: '1px solid rgba(37,99,235,0.2)' }}
              >
                <div className="text-base font-bold mb-0.5" style={{ color: '#10b981' }}>{m.value}</div>
                <div className="text-[9px] font-mono uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono transition-all hover:border-emerald-500/50"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
            >
              <GitBranch size={15} /> Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono font-bold transition-all"
              style={{ background: 'linear-gradient(135deg,#10b981,#2563eb)', color: '#020617' }}
            >
              <ExternalLink size={15} />
              {project.liveUrl.includes('grafana') ? '📊 Live Grafana Dashboard' :
               project.liveUrl.includes('.apk') ? '⬇ Download APK' : '→ Live Demo'}
            </a>
          )}
        </motion.div>

        {/* Screenshots */}
        {screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-10"
          >
            <div
              className="text-[10px] font-mono uppercase tracking-widest mb-3"
              style={{ color: '#2563eb' }}
            >
              <span style={{ color: '#10b981' }}>◆</span> Screenshots
            </div>
            <div
              className="rounded-xl overflow-hidden mb-3"
              style={{ border: '1px solid rgba(16,185,129,0.15)' }}
            >
              <img
                src={screenshots[activeImg]}
                alt={`${project.title} screenshot ${activeImg + 1}`}
                className="w-full object-cover"
                style={{ maxHeight: '420px', objectFit: 'contain', background: '#0a0f1e' }}
              />
            </div>
            {screenshots.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {screenshots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="w-16 h-10 rounded overflow-hidden transition-all"
                    style={{
                      border: `1px solid ${i === activeImg ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                      opacity: i === activeImg ? 1 : 0.5,
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Deep Dive sections */}
        {deepDive && (
          <div
            className="p-6 rounded-2xl mb-10"
            style={{
              background: 'rgba(2,6,23,0.5)',
              border: '1px solid rgba(16,185,129,0.15)',
            }}
          >
            <div
              className="flex items-center gap-2 mb-6"
            >
              <Terminal size={16} style={{ color: '#10b981' }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#10b981' }}>
                Deep Dive — Build Report
              </span>
            </div>

            {deepDive.why && <SectionBlock label="Why I Built This" content={deepDive.why} />}
            {deepDive.challenge && <SectionBlock label="Mission Objective — The Problem" content={deepDive.challenge} />}
            {deepDive.architecture && <SectionBlock label="System Architecture" content={deepDive.architecture} />}
            {deepDive.automation && <SectionBlock label="Automation & Workflows" content={deepDive.automation} />}
            {deepDive.monitoring && <SectionBlock label="Monitoring & Performance" content={deepDive.monitoring} />}
          </div>
        )}

        {/* Footer nav */}
        <div className="pt-8 border-t border-slate-800 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors"
            >
              View on GitHub <ExternalLink size={12} />
            </a>
          )}
        </div>
      </motion.div>
    </>
  );
}
