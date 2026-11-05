'use client';
import { useEffect } from 'react';

export default function ScorecardEmbed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.scoreapp.com/js/integration/v1/embedding.js?v=o9ySyN';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    /* w-full aur max-w-full se yeh poori width par stretch ho jaye ga */
    <div className="w-full max-w-full px-0 my-4">
      <div
        data-sa-url="https://146c1d25-10ac-4d7d-b525-ca7c22d7d8ed.scoreapp.com/?sa_target=_top"
        data-sa-view="inline"
        style={{ width: '100%', minHeight: '800px' }}
        data-sa-auto-height="1"
      />
    </div>
  );
}