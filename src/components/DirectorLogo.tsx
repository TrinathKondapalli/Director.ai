import React from 'react';
import logoNoBg from '../Director_ai_NOBG.png';

interface DirectorLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const DirectorLogoIcon: React.FC<{ className?: string }> = ({ className = 'h-8 w-auto' }) => {
  return (
    <img
      src={logoNoBg}
      alt="Director.ai Logo"
      className={`${className} object-contain shrink-0`}
    />
  );
};

export const DirectorLogoBanner: React.FC<{
  showBadge?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ showBadge = true, className = '', size = 'md' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const isXl = size === 'xl';

  return (
    <div
      className={`inline-flex items-center bg-[#070709] border border-[#222228] rounded-full shadow-2xl transition-all max-w-full overflow-hidden ${
        isSm
          ? 'px-2.5 sm:px-3.5 py-1.5 gap-2 sm:gap-2.5'
          : isLg
          ? 'px-4 sm:px-6 py-2.5 sm:py-3 gap-2.5 sm:gap-4'
          : isXl
          ? 'px-5 sm:px-8 py-3 sm:py-4 gap-3 sm:gap-5'
          : 'px-3 sm:px-4 py-2 gap-2 sm:gap-3'
      } ${className}`}
    >
      {/* Official Transparent Logo Image */}
      <img
        src={logoNoBg}
        alt="Director.ai"
        className={
          isSm
            ? 'h-6 sm:h-7 w-auto object-contain'
            : isLg
            ? 'h-9 sm:h-11 w-auto object-contain'
            : isXl
            ? 'h-12 sm:h-16 w-auto object-contain'
            : 'h-7 sm:h-8.5 w-auto object-contain'
        }
      />

      {showBadge && (
        <>
          {/* Vertical Divider */}
          <div className="w-[1px] h-4 sm:h-5 bg-[#2A2A34] shrink-0 hidden xs:block" />

          {/* MASTER EVERY FRAME badge */}
          <div
            className={`border border-[#7C3AED]/70 bg-[#7C3AED]/10 rounded-full text-[#C084FC] font-mono font-semibold tracking-[0.18em] sm:tracking-[0.22em] uppercase shrink-0 hidden xs:block ${
              isSm
                ? 'text-[7px] sm:text-[8px] px-1.5 sm:px-2 py-0.5'
                : isLg
                ? 'text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-0.5 sm:py-1'
                : isXl
                ? 'text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 py-1 sm:py-1.5'
                : 'text-[9px] sm:text-[10px] px-2 sm:px-3 py-0.5'
            }`}
          >
            MASTER EVERY FRAME
          </div>
        </>
      )}
    </div>
  );
};
