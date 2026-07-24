import React from 'react';
import { Hotspot } from '../types';

interface FooterProps {
  activeHotspot: Hotspot | null;
  onClearActiveHotspot: () => void;
  onOpenUxAudit: () => void;
  hotspotsCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  activeHotspot,
  onClearActiveHotspot,
  onOpenUxAudit,
  hotspotsCount
}) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 flex items-center justify-between px-4 sm:px-6 h-12 bg-[#5c5e67] text-white shadow-lg border-t border-[#44464f]">
      <div className="flex items-center gap-3 overflow-hidden text-xs sm:text-sm font-sans w-full max-w-4xl">
        <span className="material-symbols-outlined text-[#96c115] shrink-0 text-xl">
          {activeHotspot ? 'lightbulb' : 'info'}
        </span>

        {activeHotspot ? (
          <div className="flex items-center gap-2 overflow-hidden animate-fade-in text-xs sm:text-sm">
            <span className="font-mono font-bold px-1.5 py-0.5 rounded text-[10px] bg-[#96c115] text-[#151f00] shrink-0">
              HOTSPOT #{activeHotspot.id}: {activeHotspot.category}
            </span>
            <span className="truncate text-gray-100 font-medium">{activeHotspot.rationale}</span>
            <button
              onClick={onClearActiveHotspot}
              className="text-xs text-gray-300 hover:text-white underline ml-2 shrink-0 cursor-pointer"
            >
              Reset
            </button>
          </div>
        ) : (
          <span className="font-medium tracking-tight text-gray-200 truncate">
            Click the numbered hotspots (1-{hotspotsCount}) on the "AFTER" side to view redesigned UX rationale.
          </span>
        )}
      </div>

      <div className="hidden md:flex items-center gap-4 text-xs font-mono shrink-0">
        <span className="text-[#96c115] flex items-center gap-1 font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#96c115] animate-pulse"></span>
          +42% Conversion Uplift
        </span>
        <button
          onClick={onOpenUxAudit}
          className="text-gray-300 hover:text-white underline cursor-pointer"
        >
          View Full Metrics →
        </button>
      </div>
    </footer>
  );
};
