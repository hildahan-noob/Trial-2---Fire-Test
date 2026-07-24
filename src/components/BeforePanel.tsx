import React, { useState } from 'react';
import { ScreenOption } from '../types';

interface BeforePanelProps {
  currentScreen: ScreenOption;
  searchQuery: string;
}

export const BeforePanel: React.FC<BeforePanelProps> = ({ currentScreen, searchQuery }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeLegacyTab, setActiveLegacyTab] = useState<'preview' | 'code' | 'audit'>('preview');

  return (
    <div className="w-full h-full border-r border-[#c4c9b0] bg-[#f1f4f5] flex flex-col relative overflow-hidden select-none">
      {/* Header Bar */}
      <div className="p-3 sm:p-4 bg-[#ebeeef] border-b border-[#c4c9b0] flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-[#ba1a1a]">history</span>
          <span className="font-mono text-xs sm:text-sm text-[#444936] font-medium tracking-wider uppercase">
            SOURCE: ORIGINAL WEBSITE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors border cursor-pointer ${
              showHeatmap
                ? 'bg-[#ba1a1a] text-white border-[#ba1a1a]'
                : 'bg-[#e0e3e4] text-[#444936] border-[#747964]/30 hover:bg-[#d7dadb]'
            }`}
            title="Toggle Heatmap & Drop-off Analysis"
          >
            {showHeatmap ? '🔥 Heatmap ON' : '🔥 Show Heatmap'}
          </button>
          <span className="px-2 py-0.5 bg-[#ba1a1a] text-white text-xs rounded font-bold uppercase tracking-tight shadow-xs">
            LEGACY UI
          </span>
        </div>
      </div>

      {/* Main Legacy Container */}
      <div className="flex-grow bg-white m-3 sm:m-4 rounded border border-[#747964]/40 shadow-inner overflow-y-auto scrollbar-hide flex flex-col relative">
        {/* Heatmap Overlay */}
        {showHeatmap && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden bg-black/10 transition-opacity">
            {/* Heatmap hotspots representing dead clicks & drop-off zones */}
            <div className="absolute top-24 left-1/3 w-32 h-32 rounded-full bg-red-600/40 blur-xl animate-pulse"></div>
            <div className="absolute top-60 left-1/2 w-48 h-24 rounded-full bg-orange-500/35 blur-2xl"></div>
            <div className="absolute bottom-40 right-1/4 w-28 h-28 rounded-full bg-yellow-500/40 blur-xl"></div>

            {/* Heatmap Annotations */}
            <div className="absolute top-28 left-12 bg-black/80 text-white text-[10px] font-mono p-1.5 rounded shadow border border-red-500 max-w-xs">
              <span className="text-red-400 font-bold">⚠️ High Friction Zone (72% Drop-off):</span>
              <br />
              Users attempted to click static specs looking for interactive filters.
            </div>
            <div className="absolute bottom-36 right-8 bg-black/80 text-white text-[10px] font-mono p-1.5 rounded shadow border border-amber-500 max-w-xs">
              <span className="text-amber-400 font-bold">⚡ Dead Clicks:</span>
              <br />
              Table text unformatted for mobile; low engagement on technical PDF downloads.
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-w-2xl mx-auto space-y-6 opacity-60 flex-grow w-full">
          {/* Legacy Page Navigation Skeleton */}
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <div className="h-6 bg-[#d7dadb] w-44 rounded"></div>
            <div className="flex gap-2">
              <div className="h-4 bg-[#d7dadb] w-12 rounded"></div>
              <div className="h-4 bg-[#d7dadb] w-12 rounded"></div>
              <div className="h-4 bg-[#d7dadb] w-12 rounded"></div>
            </div>
          </div>

          {/* Legacy Heading Wireframe */}
          <div className="space-y-2">
            <div className="h-7 bg-[#d7dadb] w-3/4 rounded"></div>
            <div className="flex gap-4">
              <div className="w-1/3 h-3.5 bg-[#d7dadb] rounded"></div>
              <div className="w-1/4 h-3.5 bg-[#d7dadb] rounded"></div>
            </div>
          </div>

          {/* Legacy Static Hero Image / Media Placeholder */}
          <div className="aspect-video bg-[#d7dadb] w-full rounded flex flex-col items-center justify-center p-4 text-center border border-dashed border-[#747964]">
            <span className="material-symbols-outlined text-4xl text-[#444936] mb-1">image</span>
            <span className="font-mono text-xs text-[#747964]">Static Unoptimized Image File</span>
            <span className="font-mono text-[10px] text-[#747964] mt-1">(3.4 MB - Slow Loading Time)</span>
          </div>

          {/* Legacy Wall-of-Text Paragraphs */}
          <div className="space-y-2.5">
            <div className="h-3.5 bg-[#d7dadb] w-full rounded"></div>
            <div className="h-3.5 bg-[#d7dadb] w-full rounded"></div>
            <div className="h-3.5 bg-[#d7dadb] w-5/6 rounded"></div>
            <div className="h-3.5 bg-[#d7dadb] w-full rounded"></div>
            <div className="h-3.5 bg-[#d7dadb] w-2/3 rounded"></div>
          </div>

          {/* Legacy Unformatted Technical Table Representation */}
          <div className="border border-[#c4c9b0] rounded p-4 space-y-3 bg-[#f7fafb]">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="h-5 bg-[#e0e3e4] w-1/2 rounded"></div>
              <div className="h-4 bg-[#e0e3e4] w-16 rounded"></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-9 bg-[#ebeeef] rounded p-2 text-[10px] font-mono text-[#444936] truncate">ASTM E84 Class 1</div>
              <div className="h-9 bg-[#ebeeef] rounded p-2 text-[10px] font-mono text-[#444936] truncate">FSI: 25 / SDI: 50</div>
              <div className="h-9 bg-[#ebeeef] rounded p-2 text-[10px] font-mono text-[#444936] truncate">Unverified Static</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-9 bg-[#ebeeef] rounded p-2 text-[10px] font-mono text-[#444936] truncate">EN 13501-1 Euroclass</div>
              <div className="h-9 bg-[#ebeeef] rounded p-2 text-[10px] font-mono text-[#444936] truncate">B-s1, d0</div>
              <div className="h-9 bg-[#ebeeef] rounded p-2 text-[10px] font-mono text-[#444936] truncate">Manual Matrix</div>
            </div>
          </div>

          {searchQuery && (
            <div className="bg-amber-50 border border-amber-200 p-2 rounded text-xs font-mono text-amber-800">
              🔍 Search query "{searchQuery}" matches static section 4.2 without instant filtering on Legacy UI.
            </div>
          )}
        </div>

        {/* Sticky URL Bar Overlay */}
        <div className="sticky bottom-0 bg-[#e0e3e4]/95 p-3 text-center border-t border-[#c4c9b0] backdrop-blur-xs z-10 flex items-center justify-between px-4">
          <code className="text-[10px] text-[#444936] break-all font-mono truncate">
            https://www.armacell.com/en-SG/{currentScreen.id.replace('_', '-')}-fire-standards...
          </code>
          <span className="text-[10px] font-mono font-bold text-[#ba1a1a] bg-red-100 px-1.5 py-0.5 rounded border border-red-200">
            Bounce Rate: 68%
          </span>
        </div>
      </div>

      {/* Large Background Watermark Text "BEFORE" */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden">
        <div className="rotate-[-45deg] opacity-[0.035] select-none text-[100px] sm:text-[140px] font-bold text-[#181c1d] tracking-widest">
          BEFORE
        </div>
      </div>
    </div>
  );
};
