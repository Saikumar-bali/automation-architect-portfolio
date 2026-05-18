import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchTerm, setSearchTermState] = useState(searchParams.get('q') || '');
  const [selectedFilter, setSelectedFilterState] = useState(searchParams.get('filter') || 'All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    
    if (selectedFilter !== 'All') {
      params.set('filter', selectedFilter);
    } else {
      params.delete('filter');
    }
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedFilter, setSearchParams, searchParams]);

  // Sync state with URL when URL changes (e.g. back button)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const f = searchParams.get('filter') || 'All';
    
    if (q !== searchTerm) setSearchTermState(q);
    if (f !== selectedFilter) setSelectedFilterState(f);
  }, [searchParams]);

  const setSearchTerm = (term: string) => setSearchTermState(term);
  const setSelectedFilter = (filter: string) => setSelectedFilterState(filter);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedFilter,
        setSelectedFilter,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
