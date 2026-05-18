import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Command } from 'lucide-react';

interface TerminalSearchProps {
  onSearch: (query: string) => void;
  onFilter: (tech: string) => void;
  selectedFilter: string;
  initialValue?: string;
}

const technologies = ['All', 'AI', 'Automation', 'React', 'TypeScript', 'Node.js', 'Python', 'Supabase', 'Mobile'];

export default function TerminalSearch({ onSearch, onFilter, selectedFilter, initialValue = '' }: TerminalSearchProps) {
  const [query, setQuery] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div
        className="relative flex items-center rounded-lg"
        style={{
          background: 'rgba(2, 6, 23, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          boxShadow: 'inset 0 0 20px rgba(37, 99, 235, 0.05)',
        }}
      >
        <div className="pl-4 pr-3 py-3" style={{ color: '#2563eb' }}>
          <Search size={18} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search projects..."
          className="flex-1 bg-transparent outline-none font-mono text-sm py-3 pr-4"
          style={{ color: '#e2e8f0' }}
        />
        <span
          className="absolute right-4 font-mono text-xs px-2 py-1 rounded"
          style={{
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            color: '#2563eb',
          }}
        >
          <Command size={12} className="inline mr-1" />/
        </span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute right-20 w-2 h-4"
          style={{ background: '#10b981' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {technologies.map((tech, index) => (
          <motion.button
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilter(tech)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
            style={{
              background: selectedFilter === tech
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'rgba(2, 6, 23, 0.7)',
              border: selectedFilter === tech
                ? '1px solid #10b981'
                : '1px solid rgba(16, 185, 129, 0.2)',
              color: selectedFilter === tech ? '#020617' : '#10b981',
              backdropFilter: 'blur(10px)',
            }}
          >
            {tech}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}