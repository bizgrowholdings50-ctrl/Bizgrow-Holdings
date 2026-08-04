'use client';

import { useEffect } from 'react';

export default function SchemaMarkup({ schema }) {
  useEffect(() => {
    if (!schema) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);

  return null;
}
