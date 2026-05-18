import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  schema?: object;
}

const SEO = ({ 
  title = 'Saikumar Bali | Automation Architect & Systems Engineer', 
  description = 'Portfolio of Saikumar Bali - Automation Architect and Systems Engineer specializing in Quantitative Finance, AI integration, and Scalable Infrastructure.',
  image = 'https://saikumar-bali.vercel.app/og-image.png',
  url = 'https://saikumar-bali.vercel.app',
  schema
}: SEOProps) => {
  useEffect(() => {
    document.title = title.includes('Saikumar Bali') ? title : `${title} | Saikumar Bali`;
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta('description', description);
    updateMeta('keywords', 'Automation Architect, Systems Engineer, Quantitative Developer, Saikumar Bali, Fintech, AI, React, TypeScript, Python, Automation, SDUI, React Native, Algo Trading');

    updatePropertyMeta('og:title', title);
    updatePropertyMeta('og:description', description);
    updatePropertyMeta('og:type', 'website');
    updatePropertyMeta('og:url', url);
    updatePropertyMeta('og:image', image);

    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Handle JSON-LD Schema
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    }
  }, [title, description, image, url, schema]);

  return null;
};

export default SEO;