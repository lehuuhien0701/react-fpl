import { useState, useEffect } from 'react';

export const SvgLoader = ({ url, className }: { url: string; className?: string }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(text => setSvgContent(text));
  }, [url]);

  if (!svgContent) return null;

  return (
    <div 
      className={className} 
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};
