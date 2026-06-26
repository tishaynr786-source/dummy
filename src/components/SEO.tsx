import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schema?: Record<string, any>;
}

export default function SEO({ title, description, schema }: SEOProps) {
  const schemaStr = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    document.title = title;
    
    // Find or create the meta description tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Schema injection
    let schemaScript = document.getElementById('jsonld-schema') as HTMLScriptElement | null;
    if (schemaStr) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'jsonld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = schemaStr;
    } else {
      if (schemaScript) {
        schemaScript.remove();
      }
    }
  }, [title, description, schemaStr]);

  return null;
}
