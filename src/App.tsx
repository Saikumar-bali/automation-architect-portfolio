import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Home from '@/pages/Home';
import ProjectDetail from '@/pages/ProjectDetail';
import AnalyticsPage from '@/pages/Analytics';
import { SearchProvider } from '@/context/SearchContext';
import CommandPalette from '@/components/CommandPalette';

const generateColumnData = (): string[] => {
  const data: string[] = [];
  for (let i = 0; i < 50; i++) {
    if (Math.random() > 0.5) {
      data.push(Math.random() > 0.5 
        ? Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')
        : Math.random().toString(2).padStart(8, '0'));
    } else {
      data.push((Math.random() * 255).toFixed(0).padStart(2, '0'));
    }
  }
  return data;
};

const DataStreamColumn = ({ delay, speed }: { delay: number; speed: number }) => {
  const data = useMemo(() => generateColumnData(), []);
  
  return (
    <motion.div
      className="absolute top-0 bottom-0 w-8 flex flex-col items-center justify-start overflow-hidden"
      style={{ left: `${delay * 6}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ duration: 2, delay: delay * 0.3 }}
    >
      <motion.div
        className="flex flex-col"
        animate={{ y: ['0%', '-100%'] }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: 'linear',
          delay: delay * 0.5
        }}
      >
        {[...data, ...data].map((item, i) => (
          <span
            key={i}
            className="text-[10px] font-mono leading-tight"
            style={{ 
              color: item.length > 2 ? '#10b981' : '#2563eb',
              textShadow: '0 0 2px currentColor'
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
};

const SystemPulse = ({ active, intensity = 1 }: { active: boolean; intensity?: number }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-40 pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, #10b981, #2563eb, #10b981, transparent)',
        }}
        animate={{
          opacity: active ? [0.3, 0.8, 0.3] : 0.1,
          scaleY: active ? [1, 2, 1] : 1,
        }}
        transition={{
          duration: 2 * intensity,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <div
          className="min-h-screen relative overflow-x-hidden"
          style={{
            background: 'linear-gradient(180deg, #020617 0%, #051a2e 50%, #020617 100%)',
            backgroundAttachment: 'fixed',
          }}
        >
          <SystemPulse active={false} intensity={1} />
          <CommandPalette />
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <DataStreamColumn key={i} delay={i} speed={20 + (i * 3) % 15} />
            ))}
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.02) 0%, transparent 70%)
              `,
            }}
          />

          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
          <Analytics />
        </div>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;