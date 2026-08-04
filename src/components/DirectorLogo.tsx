import React from 'react';

interface DirectorLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const DirectorLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
    >
      <defs>
        <linearGradient id="directorFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="directorPlayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="40%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* Outer camera frame stroke with smooth rounded corners */}
      <rect
        x="7"
        y="7"
        width="86"
        height="66"
        rx="20"
        stroke="url(#directorFrameGrad)"
        strokeWidth="8"
        fill="none"
      />

      {/* Small camera lens dot top-right */}
      <circle cx="75" cy="22" r="4.5" fill="url(#directorFrameGrad)" />

      {/* Center play triangle icon */}
      <path
        d="M 40 26 L 68 40 L 40 54 Z"
        fill="url(#directorPlayGrad)"
        stroke="url(#directorPlayGrad)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
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
      {/* Icon */}
      <DirectorLogoIcon
        className={
          isSm
            ? 'w-5 sm:w-6 h-4 sm:h-5'
            : isLg
            ? 'w-7 sm:w-9 h-5.5 sm:h-7'
            : isXl
            ? 'w-9 sm:w-12 h-7 sm:h-9.5'
            : 'w-6 sm:w-7.5 h-5 sm:h-6'
        }
      />

      {/* DIRECTOR.AI typography */}
      <div className="flex items-center font-sans font-extrabold tracking-wider text-white shrink-0">
        <span
          className={
            isSm
              ? 'text-xs sm:text-sm'
              : isLg
              ? 'text-base sm:text-xl'
              : isXl
              ? 'text-lg sm:text-2xl md:text-3xl'
              : 'text-sm sm:text-base'
          }
        >
          DIRECTOR
        </span>
        <span
          className={`bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] bg-clip-text text-transparent ${
            isSm
              ? 'text-xs sm:text-sm'
              : isLg
              ? 'text-base sm:text-xl'
              : isXl
              ? 'text-lg sm:text-2xl md:text-3xl'
              : 'text-sm sm:text-base'
          }`}
        >
          .AI
        </span>
      </div>

      {showBadge && (
        <>
          {/* Vertical Divider - hidden on ultra-small screens */}
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
