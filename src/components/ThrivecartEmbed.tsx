'use client';

import { useEffect } from 'react';

const PLANS = {
  core: { productId: '31', embedId: 'tc-sacredspacesyoga-31-K9VNL2' },
  pro: { productId: '34', embedId: 'tc-sacredspacesyoga-34-VQM8ML' },
} as const;

export type ThrivecartPlan = 'core' | 'pro';

interface ThrivecartEmbedProps {
  /** 'core' = Teachers Collective Core (product 31), 'pro' = Teachers Collective Pro (product 34). Default: pro */
  plan?: ThrivecartPlan;
}

export default function ThrivecartEmbed({ plan = 'pro' }: ThrivecartEmbedProps) {
  const { productId, embedId } = PLANS[plan];

  useEffect(() => {
    if (!document.getElementById(embedId)) {
      const script = document.createElement('script');
      script.src = '//tinder.thrivecart.com/embed/v2/thrivecart.js';
      script.id = embedId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [embedId]);

  return (
    <div
      className="tc-v2-embeddable-target"
      data-thrivecart-account="sacredspacesyoga"
      data-thrivecart-tpl="v2"
      data-thrivecart-product={productId}
      data-thrivecart-embeddable={embedId}
    />
  );
}
