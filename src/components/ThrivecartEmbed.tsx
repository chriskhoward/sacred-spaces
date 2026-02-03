'use client';

import { useEffect } from 'react';

export default function ThrivecartEmbed() {
  useEffect(() => {
    // New Script ID: tc-sacredspacesyoga-31-NLVQN6
    const scriptId = 'tc-sacredspacesyoga-31-NLVQN6';
    // Check if script is already present to avoid duplicates
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = '//tinder.thrivecart.com/embed/v2/thrivecart.js';
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="tc-v2-embeddable-target"
      data-thrivecart-account="sacredspacesyoga"
      data-thrivecart-tpl="v2"
      data-thrivecart-product="31"
      data-thrivecart-embeddable="tc-sacredspacesyoga-31-NLVQN6"
    ></div>
  );
}
