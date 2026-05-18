import { motion } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  index: number;
  slug: string;
  featured?: boolean;
}

const ProjectCard = ({ title, description, techStack, liveUrl, index, featured }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      style={{ willChange: 'transform, opacity' }}
      className="relative group h-full"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 opacity-0 group-hover:opacity-50 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #2563eb 100%)',
          boxShadow: '0 0 40px rgba(16,185,129,0.3)',
          willChange: 'opacity',
        }}
      />

      <div
        className="relative p-6 rounded-2xl h-full flex flex-col transition-all duration-300 group-hover:border-[#10b981]"
        style={{
          background: 'rgba(2,6,23,0.7)',
          backdropFilter: 'blur(10px)',
          border: featured ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(16,185,129,0.15)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3">
          <div
            className="text-[9px] font-mono uppercase tracking-widest"
            style={{ color: '#2563eb' }}
          >
            SYS_{String(index + 1).padStart(3, '0')}
          </div>
          {featured && (
            <div
              className="text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#10b981',
              }}
            >
              ◆ Featured
            </div>
          )}
        </div>

        <motion.h3
          className="text-xl font-bold mb-3 font-mono"
          style={{ color: '#10b981' }}
          whileHover={{ textShadow: '0 0 20px #10b981' }}
        >
          {title}
        </motion.h3>

        <p
          className="text-sm mb-4 flex-1 font-mono leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          {description.length > 130 ? description.slice(0, 130) + '…' : description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {techStack.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[9px] rounded border font-mono uppercase tracking-wider"
              style={{
                background: 'rgba(37,99,235,0.05)',
                borderColor: 'rgba(37,99,235,0.2)',
                color: '#7eb3f8',
              }}
            >
              {tech}
            </span>
          ))}
          {techStack.length > 5 && (
            <span
              className="px-2 py-0.5 text-[9px] rounded border font-mono"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}
            >
              +{techStack.length - 5}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium font-mono shadow-lg shadow-emerald-500/10"
              style={{ background: 'linear-gradient(135deg,#10b981 0%,#059669 100%)', color: '#020617' }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={12} />
              Live
            </motion.a>
          )}
          <div
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium font-mono transition-all group-hover:bg-[#10b981]/10"
            style={{
              background: 'rgba(16,185,129,0.05)',
              border: '1px solid rgba(16,185,129,0.2)',
              color: '#10b981',
            }}
          >
            <Terminal size={12} />
            Case Study
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
