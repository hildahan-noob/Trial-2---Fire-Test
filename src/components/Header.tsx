import React, { useState } from 'react';
import { ViewMode, ScreenOption } from '../types';
import { SCREENS } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenOption;
  onSelectScreen: (screen: ScreenOption) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  showHotspots: boolean;
  onToggleHotspots: () => void;
  onOpenUxAudit: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  viewMode,
  onChangeViewMode,
  showHotspots,
  onToggleHotspots,
  onOpenUxAudit,
  searchQuery,
  onSearchChange
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 h-16 bg-[#f7fafb] border-b border-[#c4c9b0] shadow-xs select-none">
      {/* Left Brand Area */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 rounded-md hover:bg-[#ebeeef] text-[#4e6700] transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-6 bg-[#96c115] rounded-xs hidden sm:block"></div>
          <span className="font-sans font-bold text-base sm:text-lg text-[#4e6700] tracking-tight">
            ARMACELL INDUSTRIAL
          </span>
        </div>

        {/* Screen Picker Dropdown */}
        <div className="relative hidden md:block">
          <select
            value={currentScreen.id}
            onChange={(e) => {
              const selected = SCREENS.find(s => s.id === e.target.value);
              if (selected) onSelectScreen(selected);
            }}
            className="bg-[#ebeeef] border border-[#c4c9b0] text-[#181c1d] text-xs font-mono py-1 px-2.5 rounded-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#4e6700] cursor-pointer"
          >
            {SCREENS.map((screen) => (
              <option key={screen.id} value={screen.id}>
                {screen.code}: {screen.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls Area */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search Bar Toggle */}
        <div className="relative flex items-center">
          {isSearchOpen ? (
            <div className="flex items-center bg-[#ebeeef] border border-[#c4c9b0] rounded-sm px-2 py-1 w-44 sm:w-64 transition-all">
              <span className="material-symbols-outlined text-sm text-[#747964] mr-1">search</span>
              <input
                type="text"
                placeholder="Search ASTM E84, EN 13501..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent text-xs text-[#181c1d] focus:outline-none w-full font-mono"
                autoFocus
              />
              <button
                onClick={() => { setIsSearchOpen(false); onSearchChange(''); }}
                className="text-[#747964] hover:text-[#181c1d] text-xs ml-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-sm hover:bg-[#ebeeef] text-[#444936] transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Search Standards"
            >
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
          )}
        </div>

        {/* View Mode Controls */}
        <div className="hidden lg:flex items-center bg-[#ebeeef] border border-[#c4c9b0] rounded-sm p-0.5">
          <button
            onClick={() => onChangeViewMode('split')}
            className={`px-2 py-1 text-[11px] font-mono font-medium rounded-xs transition-colors cursor-pointer ${
              viewMode === 'split' ? 'bg-[#4e6700] text-white' : 'text-[#444936] hover:bg-[#e0e3e4]'
            }`}
            title="Side by Side Comparison"
          >
            Split 50/50
          </button>
          <button
            onClick={() => onChangeViewMode('slider')}
            className={`px-2 py-1 text-[11px] font-mono font-medium rounded-xs transition-colors cursor-pointer ${
              viewMode === 'slider' ? 'bg-[#4e6700] text-white' : 'text-[#444936] hover:bg-[#e0e3e4]'
            }`}
            title="Interactive Overlay Slider"
          >
            Slider View
          </button>
          <button
            onClick={() => onChangeViewMode('after-only')}
            className={`px-2 py-1 text-[11px] font-mono font-medium rounded-xs transition-colors cursor-pointer ${
              viewMode === 'after-only' ? 'bg-[#4e6700] text-white' : 'text-[#444936] hover:bg-[#e0e3e4]'
            }`}
            title="Optimized UI Only"
          >
            After Only
          </button>
        </div>

        {/* Hotspots Toggle */}
        <button
          onClick={onToggleHotspots}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-mono transition-colors border cursor-pointer ${
            showHotspots
              ? 'bg-[#96c115] text-[#384b00] border-[#96c115] font-bold shadow-xs'
              : 'bg-[#ebeeef] text-[#444936] border-[#c4c9b0] hover:bg-[#e0e3e4]'
          }`}
          title="Toggle Hotspots Rationale Overlays"
        >
          <span className="w-2 h-2 rounded-full bg-current"></span>
          <span>Hotspots ({showHotspots ? 'ON' : 'OFF'})</span>
        </button>

        {/* UX Audit Button */}
        <button
          onClick={onOpenUxAudit}
          className="hidden sm:flex items-center gap-1 bg-[#006591] text-white text-xs px-2.5 py-1 rounded-sm font-mono font-medium hover:bg-[#004c6e] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">analytics</span>
          <span>UX Audit</span>
        </button>

        {/* Subtitle Badge */}
        <span className="hidden xl:inline-block font-mono text-[10px] text-[#444936] uppercase tracking-widest pl-2 border-l border-[#c4c9b0]">
          COMPARATIVE PERFORMANCE ANALYTICS
        </span>
      </div>

      {/* Drawer Menu for Mobile/Small Screens */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-72 bg-white border-r border-b border-[#c4c9b0] shadow-xl p-4 z-50 flex flex-col gap-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-bold text-xs uppercase font-mono text-[#4e6700]">Select Screen</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-xs text-gray-500">✕</button>
          </div>
          <div className="space-y-1">
            {SCREENS.map((screen) => (
              <button
                key={screen.id}
                onClick={() => {
                  onSelectScreen(screen);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left p-2 rounded-sm text-xs font-mono transition-colors ${
                  currentScreen.id === screen.id
                    ? 'bg-[#96c115]/20 text-[#384b00] font-bold border-l-2 border-[#4e6700]'
                    : 'hover:bg-[#f1f4f5] text-[#181c1d]'
                }`}
              >
                <div className="font-bold">{screen.code}</div>
                <div className="text-[11px] text-gray-600 truncate">{screen.category}</div>
              </button>
            ))}
          </div>

          <div className="border-t pt-3 mt-1">
            <span className="font-bold text-xs uppercase font-mono text-[#4e6700] block mb-2">View Mode</span>
            <div className="grid grid-cols-2 gap-1 text-xs font-mono">
              <button
                onClick={() => { onChangeViewMode('split'); setIsMenuOpen(false); }}
                className={`p-1.5 text-center rounded-xs ${viewMode === 'split' ? 'bg-[#4e6700] text-white' : 'bg-gray-100'}`}
              >
                50/50 Split
              </button>
              <button
                onClick={() => { onChangeViewMode('slider'); setIsMenuOpen(false); }}
                className={`p-1.5 text-center rounded-xs ${viewMode === 'slider' ? 'bg-[#4e6700] text-white' : 'bg-gray-100'}`}
              >
                Slider
              </button>
              <button
                onClick={() => { onChangeViewMode('before-only'); setIsMenuOpen(false); }}
                className={`p-1.5 text-center rounded-xs ${viewMode === 'before-only' ? 'bg-[#4e6700] text-white' : 'bg-gray-100'}`}
              >
                Legacy UI
              </button>
              <button
                onClick={() => { onChangeViewMode('after-only'); setIsMenuOpen(false); }}
                className={`p-1.5 text-center rounded-xs ${viewMode === 'after-only' ? 'bg-[#4e6700] text-white' : 'bg-gray-100'}`}
              >
                Optimized
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
