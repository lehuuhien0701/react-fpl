"use client";
import { createContext, useContext, ReactNode } from 'react';

interface FooterData {
  social?: Array<{
    id: number;
    link: string;
    icon: {
      url: string;
      name: string;
    };
  }>;
  [key: string]: any;
}

const FooterContext = createContext<FooterData | null>(null);

export function FooterProvider({ 
  children, 
  data 
}: { 
  children: ReactNode; 
  data: FooterData;
}) {
  return (
    <FooterContext.Provider value={data}>
      {children}
    </FooterContext.Provider>
  );
}

export function useFooterData() {
  const context = useContext(FooterContext);
  if (context === null) {
    throw new Error('useFooterData must be used within a FooterProvider');
  }
  return context;
}
