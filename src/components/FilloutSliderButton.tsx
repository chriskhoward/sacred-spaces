'use client';

import { useEffect } from 'react';

const FILLOUT_FORM_ID = 'e4pZwnuAkYus';

interface FilloutSliderButtonProps {
  /** Button label (Fillout shows this on the trigger button) */
  buttonText?: string;
  /** Wrapper className for layout/styling */
  className?: string;
  /** Match existing Fillout CTA wrappers for global CSS overrides */
  variant?: 'default' | 'hero' | 'cta' | 'dark';
}

export default function FilloutSliderButton({
  buttonText = 'Join the Teachers Collective',
  className = '',
  variant = 'default',
}: FilloutSliderButtonProps) {
  useEffect(() => {
    if (!document.querySelector('script[src="https://server.fillout.com/embed/v1/"]')) {
      const script = document.createElement('script');
      script.src = 'https://server.fillout.com/embed/v1/';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const wrapperClass =
    variant === 'hero'
      ? 'fillout-cta-its-time'
      : variant === 'cta'
        ? 'fillout-cta-final'
        : variant === 'dark'
          ? 'fillout-cta-dark'
          : '';

  const buttonColor = variant === 'dark' ? '#413356' : '#C7A254';

  return (
    <div className={`${wrapperClass} ${className}`.trim()}>
      <div
        data-fillout-id={FILLOUT_FORM_ID}
        data-fillout-embed-type="slider"
        data-fillout-button-text={buttonText}
        data-fillout-button-color={buttonColor}
        data-fillout-button-size="large"
        data-fillout-slider-direction="right"
        data-fillout-inherit-parameters=""
        data-fillout-popup-size="medium"
      />
    </div>
  );
}
