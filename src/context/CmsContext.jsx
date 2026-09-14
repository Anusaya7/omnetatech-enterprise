import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [content, setContent] = useState(null);
  const [services, setServices] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [insights, setInsights] = useState([]);
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshData = useCallback(async () => {
    try {
      const bundle = await api.getPublicBundle();
      if (bundle) {
        if (bundle.content) setContent(bundle.content);
        if (Array.isArray(bundle.services)) setServices(bundle.services);
        if (Array.isArray(bundle.solutions)) setSolutions(bundle.solutions);
        if (Array.isArray(bundle.industries)) setIndustries(bundle.industries);
        if (Array.isArray(bundle.portfolio)) setPortfolio(bundle.portfolio);
        if (Array.isArray(bundle.insights)) setInsights(bundle.insights);
        if (Array.isArray(bundle.careers)) setCareers(bundle.careers);
      }
      setError(null);
    } catch (err) {
      console.warn('Could not load dynamic CMS bundle, fallback data will be used if available:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    api.getPublicBundle()
      .then((bundle) => {
        if (!ignore && bundle) {
          if (bundle.content) setContent(bundle.content);
          if (Array.isArray(bundle.services)) setServices(bundle.services);
          if (Array.isArray(bundle.solutions)) setSolutions(bundle.solutions);
          if (Array.isArray(bundle.industries)) setIndustries(bundle.industries);
          if (Array.isArray(bundle.portfolio)) setPortfolio(bundle.portfolio);
          if (Array.isArray(bundle.insights)) setInsights(bundle.insights);
          if (Array.isArray(bundle.careers)) setCareers(bundle.careers);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.warn('Could not load dynamic CMS bundle, fallback data will be used if available:', err);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const value = {
    content,
    services,
    solutions,
    industries,
    portfolio,
    insights,
    careers,
    isLoading,
    error,
    refreshData
  };

  return (
    <CmsContext.Provider value={value}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
