'use client';

import { useEffect } from 'react';

export default function FilloutForm() {
  useEffect(() => {
    // Load Fillout embed script if not already loaded
    if (!document.querySelector('script[src="https://server.fillout.com/embed/v1/"]')) {
      const script = document.createElement('script');
      script.src = 'https://server.fillout.com/embed/v1/';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div 
      className="w-full"
      style={{ height: '500px' }}
      data-fillout-id="e4pZwnuAkYus"
      data-fillout-embed-type="standard"
      data-fillout-inherit-parameters
      data-fillout-dynamic-resize
    ></div>
  );
}
