'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const BENEFITS = [
  { id: 'core' as const, src: '/assets/images/core_benefits.png', alt: 'Core Benefits', cardClass: 'bg-(--color-gallery) border-gray-300' },
  { id: 'pro' as const, src: '/assets/images/pro_benefits.png', alt: 'Pro Benefits', cardClass: 'bg-(--color-martinique) border-white/30' },
];

export function BenefitsImages() {
  const [lightboxId, setLightboxId] = useState<'core' | 'pro' | null>(null);

  const open = (id: 'core' | 'pro') => setLightboxId(id);
  const close = () => setLightboxId(null);

  useEffect(() => {
    if (lightboxId) {
      document.body.style.overflow = 'hidden';
      const onEscape = (e: KeyboardEvent) => e.key === 'Escape' && close();
      window.addEventListener('keydown', onEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onEscape);
      };
    }
  }, [lightboxId]);

  return (
    <>
      <div className="flex flex-col gap-8">
        {BENEFITS.map(({ id, src, alt, cardClass }) => (
          <button
            type="button"
            key={id}
            onClick={() => open(id)}
            className={`${cardClass} p-8 rounded-[30px] text-center border-2 border-dashed min-h-[300px] flex items-center justify-center relative overflow-hidden w-full cursor-pointer hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2`}
          >
            <Image src={src} fill className="object-contain p-4" alt={alt} sizes="(max-width: 1024px) 100vw, 50vw" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxId && (() => {
        const item = BENEFITS.find((b) => b.id === lightboxId);
        if (!item) return null;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`View ${item.alt}`}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-2xl leading-none"
              aria-label="Close lightbox"
            >
              ×
            </button>
            <div
              className="relative w-full max-w-4xl h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>
        );
      })()}
    </>
  );
}
