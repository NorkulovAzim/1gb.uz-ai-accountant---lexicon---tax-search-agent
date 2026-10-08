import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
  showGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'w-10 h-10',
  showGlow = true,
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg transition-transform duration-200 group-hover:scale-105 flex-shrink-0 ${className} ${
        showGlow ? 'shadow-emerald-950/50 ring-1 ring-emerald-500/40 hover:ring-emerald-400' : ''
      }`}
    >
      <img
        src="/apple-touch-icon.png"
        alt="Главбух Узбекистан & Lex.uz"
        className="w-full h-full object-cover select-none"
        loading="eager"
      />
    </div>
  );
};
