'use client';

import Script from 'next/script';

export default function EndorsalScript() {
  return (
    <Script
      id="endorsal-setup"
      src="https://cdn.endorsal.io/widgets/widget.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.NDRSL) {
          window.NDRSL.init("5df2ab9a4264b34634388ca3");
        }
      }}
    />
  );
}