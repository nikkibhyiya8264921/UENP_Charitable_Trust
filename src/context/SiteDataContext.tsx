
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import defaultData from '../data/siteData.json';

type SiteDataContextType = {
  siteData: typeof defaultData;
  updateSiteData: (newData: typeof defaultData) => void;
  isLoading: boolean;
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [siteData, setSiteData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with an actual API call in a production environment
    // For now, we'll simulate loading the data with a small delay
    const timer = setTimeout(() => {
      // Check if there's any data in localStorage (for admin updates)
      const savedData = localStorage.getItem('siteData');
      if (savedData) {
        try {
          setSiteData(JSON.parse(savedData));
        } catch (error) {
          console.error('Error parsing saved site data:', error);
          // Fall back to default data if there's an error
          setSiteData(defaultData);
        }
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const updateSiteData = (newData: typeof defaultData) => {
    setSiteData(newData);
    // In a real app, this would be an API call
    // For now, we'll save to localStorage for demonstration
    localStorage.setItem('siteData', JSON.stringify(newData));
  };

  return (
    <SiteDataContext.Provider value={{ siteData, updateSiteData, isLoading }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
