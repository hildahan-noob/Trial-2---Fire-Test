import React from 'react';
import { Hotspot } from '../types';

interface HotspotBubbleProps {
  hotspot: Hotspot;
  onClose: () => void;
}

export const HotspotBubble: React.FC<HotspotBubbleProps> = ({ hotspot, onClose }) => {
  const isPrimary = hotspot.accentColor === 'primary';
  const borderColor = isPrimary ? '#96c115' : '#006591';
  const headerColor = isPrimary ? '#4e6700' : '#006591';

  return (
    <div
      className="absolute z-40 w-72 sm:w-80 p-4 bg-white border-2 rounded-xl shadow-2xl transition-all duration-300 animate-scale-up"
      style={{
        borderColor: borderColor,
        top: hotspot.position.top,
        left: hotspot.position.left || 'auto',
        right: hotspot.position.right || 'auto',
        bottom: hotspot.position.bottom || 'auto'
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded-full text-white text-xs font-bold font-mono flex items-center justify-center shrink-0 shadow-xs"
            style={{ backgroundColor: isPrimary ? '#4e6700' : '#006591' }}
          >
            {hotspot.id}
          </span>
          <h4
            className="font-bold uppercase text-[11px] tracking-widest font-mono"
            style={{ color: headerColor }}
          >
            UX Logic • {hotspot.category}
          </h4>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-sm p-0.5 rounded cursor-pointer"
        >
          ✕
        </button>
      </div>

      <p className="text-xs sm:text-sm leading-relaxed text-[#181c1d] font-sans font-normal">
        {hotspot.rationale}
      </p>

      <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-500 font-mono">
        <span>Target: #{hotspot.targetId}</span>
        <span className="text-[#4e6700] font-bold">ARMACELL DESIGN SYSTEM</span>
      </div>
    </div>
  );
};
