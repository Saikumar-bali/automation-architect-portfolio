import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command as CommandIcon, ExternalLink, Terminal } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
}

const technologies = ['All', 'AI', 'Automation', 'React', 'TypeScript', 'Node.js', 'Python', 'Supabase', 'Mobile'];

export default function CommandPalette() {
  const { searchTerm, setSearchTerm, selectedFilter, setSelectedFilter, isSearchOpen, setIsSearchOpen } = useSearch();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(err => console.error('Failed to fetch projects for palette:', err));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = 
        selectedFilter === 'All' || 
        project.techStack.some(tech => tech.toLowerCase().includes(selectedFilter.toLowerCase()));

      return matchesSearch && matchesFilter;
    }).slice(0, 8); // Limit to top 8 results
  }, [projects, searchTerm, selectedFilter]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm, selectedFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsSearchOpen(true);
        }
      }
      
      if (!isSearchOpen) return;

      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredProjects.length));
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredProjects.length) % Math.max(1, filteredProjects.length));
      }

      if (e.key === 'Enter' && filteredProjects[selectedIndex]) {
        e.preventDefault();
        const project = filteredProjects[selectedIndex];
        setIsSearchOpen(false);
        navigate(`/project/${project.slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen, filteredProjects, selectedIndex, navigate]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[15%] z-[101] w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <div
              className="overflow-hidden rounded-xl border border-emerald-500/20 bg-slate-900 shadow-2xl shadow-emerald-500/10"
              style={{
                boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)',
              }}
            >
              <div className="flex items-center border-b border-slate-800 px-4">
                <Search className="h-5 w-5 text-emerald-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects or type technology..."
                  className="flex-1 bg-transparent px-4 py-4 font-mono text-sm text-slate-200 outline-none"
                />
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 border border-slate-700">
                    ESC
                  </span>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {/* Filters */}
                <div className="p-4 bg-slate-800/20 border-b border-slate-800">
                  <h3 className="mb-3 px-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    Active Filters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => setSelectedFilter(tech)}
                        className={`rounded-lg px-3 py-1.5 font-mono text-[10px] transition-all ${
                          selectedFilter === tech
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="p-2">
                  <h3 className="my-2 px-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    {filteredProjects.length > 0 ? 'Detected Project Nodes' : 'No matches found'}
                  </h3>
                  
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/project/${project.slug}`);
                      }}
                      className={`group flex items-center gap-4 rounded-lg px-4 py-3 cursor-pointer transition-all ${
                        selectedIndex === index 
                          ? 'bg-emerald-500/10 border border-emerald-500/30' 
                          : 'bg-transparent border border-transparent hover:bg-slate-800/40'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedIndex === index ? 'bg-emerald-500/20' : 'bg-slate-800'}`}>
                        <Terminal size={16} className={selectedIndex === index ? 'text-emerald-400' : 'text-slate-500'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-sm font-bold truncate ${selectedIndex === index ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {project.title}
                          </span>
                          {selectedIndex === index && (
                            <motion.span 
                              initial={{ opacity: 0, x: -5 }} 
                              animate={{ opacity: 1, x: 0 }}
                              className="text-[10px] font-mono text-emerald-500/50"
                            >
                              [ENTER]
                            </motion.span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate font-mono">
                          {project.techStack.join(' • ')}
                        </p>
                      </div>
                      <ExternalLink size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${selectedIndex === index ? 'text-emerald-500' : 'text-slate-500'}`} />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 bg-slate-900/50 p-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <span className="rounded bg-slate-800 px-1 py-0.5 border border-slate-700 text-slate-400">↑↓</span> to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="rounded bg-slate-800 px-1 py-0.5 border border-slate-700 text-slate-400">↵</span> to select
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500/50">
                    <CommandIcon size={10} />
                    <span>SYSTEM_READY</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
