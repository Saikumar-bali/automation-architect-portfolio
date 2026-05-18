import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

interface ProjectStat {
  id: string;
  title: string;
  views: number;
  likes: number;
  techStack: string[];
}

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' as const } },
  exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.4, ease: 'easeIn' as const } },
};

const StatCard = ({ title, value, change, icon, delay }: { title: string; value: string; change?: string; icon: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="p-5 rounded-xl"
    style={{
      background: 'rgba(2,6,23,0.65)',
      border: '1px solid rgba(16,185,129,0.18)',
    }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl">{icon}</span>
      {change && (
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}
        >
          {change}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold mb-1" style={{ color: '#fff' }}>{value}</div>
    <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>{title}</div>
  </motion.div>
);

const LeaderboardItem = ({ rank, project, index }: { rank: number; project: ProjectStat; index: number }) => {
  const medalColors = ['#f59e0b', '#94a3b8', '#cd7f32'];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 rounded-lg"
      style={{
        background: rank <= 3 ? 'rgba(16,185,129,0.05)' : 'rgba(2,6,23,0.4)',
        border: `1px solid ${rank <= 3 ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}`,
      }}
    >
      <div
        className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
        style={{
          background: rank <= 3 ? `${medalColors[rank - 1]}20` : 'rgba(255,255,255,0.05)',
          color: rank <= 3 ? medalColors[rank - 1] : 'rgba(255,255,255,0.4)',
          border: rank <= 3 ? `1px solid ${medalColors[rank - 1]}40` : 'none',
        }}
      >
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate" style={{ color: '#fff' }}>{project.title}</div>
        <div className="flex gap-1 mt-1 flex-wrap">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', color: '#2563eb' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold" style={{ color: '#10b981' }}>{project.views.toLocaleString()}</div>
        <div className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>views</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold" style={{ color: '#2563eb' }}>{project.likes}</div>
        <div className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>likes</div>
      </div>
    </motion.div>
  );
};

export default function Analytics() {
  const [projects, setProjects] = useState<ProjectStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProjects([
        { id: '1', title: 'Algo Trading Engine', views: 4523, likes: 234, techStack: ['Python', 'NestJS', 'Redis'] },
        { id: '2', title: 'WhatsApp AI Bot', views: 3891, likes: 189, techStack: ['Groq', 'Playwright', 'Node.js'] },
        { id: '3', title: 'React Native SDUI', views: 3245, likes: 156, techStack: ['React Native', 'TypeScript'] },
        { id: '4', title: 'Portfolio Dashboard', views: 2876, likes: 143, techStack: ['Next.js', 'Tailwind', 'Framer'] },
        { id: '5', title: 'PDF Parser API', views: 2156, likes: 98, techStack: ['Python', 'FastAPI', 'Docker'] },
        { id: '6', title: 'Grafana Dashboards', views: 1876, likes: 87, techStack: ['Grafana', 'InfluxDB', 'AWS'] },
        { id: '7', title: 'Chrome Extension', views: 1543, likes: 76, techStack: ['React', 'Chrome API', 'Vite'] },
        { id: '8', title: 'Auto Resume Builder', views: 1234, likes: 65, techStack: ['Svelte', 'Supabase', 'PDF'] },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const totalViews = projects.reduce((acc, p) => acc + p.views, 0);
  const totalLikes = projects.reduce((acc, p) => acc + p.likes, 0);
  const avgViews = Math.round(totalViews / projects.length) || 0;

  return (
    <>
      <SEO title="Analytics" description="View project performance metrics and rankings" />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 px-4 py-16 pb-24"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div
              className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-4 uppercase tracking-widest"
              style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)', color: '#2563eb' }}
            >
              // ANALYTICS_DASHBOARD
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#fff', letterSpacing: '-0.03em' }}>
              Project <span style={{ color: '#10b981' }}>Metrics</span>
            </h1>
            <p className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Performance rankings and engagement analytics
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <StatCard title="Total Projects" value="35" change="+5" icon="📦" delay={0.1} />
            <StatCard title="Total Views" value={totalViews.toLocaleString()} change="+12%" icon="👁" delay={0.2} />
            <StatCard title="Total Likes" value={totalLikes.toString()} change="+8%" icon="♥" delay={0.3} />
            <StatCard title="Avg Views" value={avgViews.toLocaleString()} icon="📊" delay={0.4} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div
              className="inline-block px-3 py-1 rounded-full text-[10px] font-mono mb-6 uppercase tracking-widest"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}
            >
              ◆ PROJECT_LEADERBOARD
            </div>

            <div className="space-y-3">
              {loading ? (
                <div
                  className="py-12 text-center text-sm font-mono rounded-xl"
                  style={{ background: 'rgba(2,6,23,0.65)', border: '1px solid rgba(16,185,129,0.18)', color: 'rgba(255,255,255,0.4)' }}
                >
                  {'>'} Loading analytics...
                </div>
              ) : (
                projects
                  .sort((a, b) => b.views - a.views)
                  .map((project, index) => (
                    <LeaderboardItem key={project.id} rank={index + 1} project={project} index={index} />
                  ))
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}