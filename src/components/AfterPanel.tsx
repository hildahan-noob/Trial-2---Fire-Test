import React, { useState } from 'react';
import { Hotspot, ScreenOption, MaterialOption } from '../types';
import { HOTSPOTS, MATERIALS, COMPLIANCE_RECORDS } from '../data/mockData';

interface AfterPanelProps {
  currentScreen: ScreenOption;
  activeHotspot: Hotspot | null;
  onSelectHotspot: (hotspot: Hotspot) => void;
  showHotspots: boolean;
  onOpenConsult: () => void;
  onOpenPdf: () => void;
  searchQuery: string;
}

export const AfterPanel: React.FC<AfterPanelProps> = ({
  currentScreen,
  activeHotspot,
  onSelectHotspot,
  showHotspots,
  onOpenConsult,
  onOpenPdf,
  searchQuery
}) => {
  const [activeTab, setActiveTab] = useState<'Standards Matrix' | 'Testing Procedures' | 'Material Safety' | 'Global Compliance'>('Standards Matrix');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(MATERIALS[0]);
  const [parameterMode, setParameterMode] = useState<'ASTM' | 'EN'>('ASTM');
  const [flameTimeline, setFlameTimeline] = useState<number>(5); // 0 to 10 minutes slider
  const [filteredRegion, setFilteredRegion] = useState<string>('ALL');

  // Filter compliance records based on searchQuery and region
  const filteredRecords = COMPLIANCE_RECORDS.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.standard.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = filteredRegion === 'ALL' || record.region === filteredRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="w-full h-full bg-[#f7fafb] flex flex-col relative overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="p-3 sm:p-4 bg-[#96c115] border-b border-[#4e6700]/20 flex justify-between items-center shadow-xs z-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-[#384b00]">auto_awesome</span>
          <span className="font-mono text-xs sm:text-sm text-[#384b00] font-bold tracking-wider uppercase">
            RE-ENGINEERED EXPERIENCE ({currentScreen.code})
          </span>
        </div>
        <span className="px-2 py-0.5 bg-[#006591] text-white text-xs rounded font-bold uppercase tracking-tight shadow-xs">
          OPTIMIZED
        </span>
      </div>

      {/* Main Redesign Canvas */}
      <div className="flex-grow relative bg-white m-3 sm:m-4 rounded border border-[#4e6700]/20 shadow-xl overflow-hidden flex flex-col">
        {/* Scrollable Content Body */}
        <div className="flex-grow overflow-y-auto scrollbar-hide p-4 sm:p-6 space-y-6 relative">
          {/* 1. Sticky Jump-Links (Hotspot 1 Target) */}
          <div
            id="target-1"
            className="sticky top-0 z-20 flex gap-2 overflow-x-auto pb-3 pt-1 glass-panel -mx-4 sm:-mx-6 px-4 sm:px-6 mb-4 border-b border-gray-100"
          >
            {(['Standards Matrix', 'Testing Procedures', 'Material Safety', 'Global Compliance'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#4e6700] text-white font-semibold shadow-xs'
                    : 'bg-[#e6e9ea] text-[#444936] hover:bg-[#e0e3e4]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#96c115]/15 text-[#384b00] font-mono text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4e6700]"></span>
                {currentScreen.category}
              </div>
              <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#4e6700] leading-tight tracking-tight">
                {currentScreen.title}
              </h1>
              <p className="text-sm sm:text-base text-[#444936] leading-relaxed">
                {currentScreen.subtitle}
              </p>
            </div>

            {/* 2. "Did You Know?" Callout (Hotspot 2 Target) */}
            <div
              id="target-2"
              className="md:col-span-4 bg-[#4ebdff]/15 border border-[#4ebdff] p-5 rounded-xl relative overflow-hidden transition-all hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[#006591] absolute -right-3 -bottom-3 text-7xl opacity-10 pointer-events-none">
                help
              </span>
              <h3 className="font-sans text-base font-bold text-[#006591] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006591] text-lg">lightbulb</span>
                Did You Know?
              </h3>
              <p className="text-xs sm:text-sm text-[#004a6c] leading-snug">
                Class A materials in ASTM E84 are not automatically equivalent to Class A1/A2 in European EN standards. Standardized mapping is critical for APAC specifiers.
              </p>
              <button
                onClick={onOpenConsult}
                className="mt-3 text-[11px] font-mono font-bold text-[#006591] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Learn Mapping Criteria →
              </button>
            </div>
          </div>

          {/* 3. Interactive Data Section (Hotspot 3 Target) */}
          <div id="target-3" className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-2">
            {/* Smoke Development Comparison Card */}
            <div className="bg-[#f1f4f5] border border-[#c4c9b0] p-5 sm:p-6 rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-mono text-xs font-bold text-[#444936] tracking-wider uppercase">
                    SMOKE DEVELOPMENT COMPARISON
                  </h4>
                  <div className="flex bg-[#e0e3e4] rounded p-0.5 text-[10px] font-mono">
                    <button
                      onClick={() => setParameterMode('ASTM')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        parameterMode === 'ASTM' ? 'bg-[#4e6700] text-white font-bold' : 'text-gray-600'
                      }`}
                    >
                      ASTM E84
                    </button>
                    <button
                      onClick={() => setParameterMode('EN')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        parameterMode === 'EN' ? 'bg-[#4e6700] text-white font-bold' : 'text-gray-600'
                      }`}
                    >
                      EN 13501-1
                    </button>
                  </div>
                </div>

                {/* Animated Comparison Bar Graph */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-[#181c1d]">ArmaFlex Ultra</span>
                      <span className="font-mono font-bold text-[#4e6700]">
                        {parameterMode === 'ASTM' ? '25 / 50' : 's1 (Low Smoke)'}
                      </span>
                    </div>
                    <div className="h-2.5 bg-[#c4c9b0]/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4e6700] transition-all duration-700 ease-out rounded-full"
                        style={{ width: parameterMode === 'ASTM' ? '50%' : '25%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-[#181c1d]">Competitor High-Temp</span>
                      <span className="font-mono font-bold text-[#006591]">
                        {parameterMode === 'ASTM' ? '120 / 150' : 's2 (Moderate Smoke)'}
                      </span>
                    </div>
                    <div className="h-2.5 bg-[#c4c9b0]/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#006591] transition-all duration-700 ease-out rounded-full"
                        style={{ width: parameterMode === 'ASTM' ? '85%' : '70%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-[#181c1d]">ArmaFlex Class 0</span>
                      <span className="font-mono font-bold text-[#96c115]">
                        {parameterMode === 'ASTM' ? '35 / 50' : 's2 (Low-Mid)'}
                      </span>
                    </div>
                    <div className="h-2.5 bg-[#c4c9b0]/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#96c115] transition-all duration-700 ease-out rounded-full"
                        style={{ width: parameterMode === 'ASTM' ? '60%' : '35%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#444936] italic border-t border-[#c4c9b0]/50 pt-2 font-mono">
                *Interactive graph: Toggle between ASTM and EN parameters to compare testing indices.
              </p>
            </div>

            {/* Flame Spread Dynamics Interactive SVG Curve */}
            <div className="bg-[#f1f4f5] border border-[#c4c9b0] p-5 sm:p-6 rounded-xl flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-mono text-xs font-bold text-[#444936] tracking-wider uppercase">
                  FLAME SPREAD DYNAMICS
                </h4>
                <div className="text-[10px] font-mono text-[#4e6700] font-bold bg-[#96c115]/20 px-2 py-0.5 rounded">
                  Time Scrub: {flameTimeline} min
                </div>
              </div>

              {/* SVG Flame Spread Curve Graph */}
              <div className="bg-white rounded border border-[#c4c9b0] p-3 relative h-36 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
                  {/* Grid background lines */}
                  <line x1="0" y1="20" x2="300" y2="20" stroke="#e0e3e4" strokeDasharray="3,3" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#e0e3e4" strokeDasharray="3,3" />
                  <line x1="0" y1="80" x2="300" y2="80" stroke="#e0e3e4" strokeDasharray="3,3" />

                  {/* Limit line at 25 index */}
                  <line x1="0" y1="65" x2="300" y2="65" stroke="#ba1a1a" strokeDasharray="4,4" strokeWidth="1.5" />
                  <text x="5" y="60" fill="#ba1a1a" fontSize="8" fontFamily="JetBrains Mono">
                    Max Class A Limit (25)
                  </text>

                  {/* Curve 1: ArmaFlex Ultra (Low curve staying under 25 limit) */}
                  <path
                    d="M 0 95 Q 100 80 200 82 T 300 83"
                    fill="none"
                    stroke="#4e6700"
                    strokeWidth="3"
                  />

                  {/* Curve 2: Competitor (Spikes over 25 limit) */}
                  <path
                    d="M 0 95 Q 80 40 180 20 T 300 10"
                    fill="none"
                    stroke="#006591"
                    strokeWidth="2.5"
                    strokeDasharray="4,2"
                  />

                  {/* Scrubber vertical line */}
                  <line
                    x1={flameTimeline * 30}
                    y1="0"
                    x2={flameTimeline * 30}
                    y2="100"
                    stroke="#384b00"
                    strokeWidth="1.5"
                  />
                  <circle cx={flameTimeline * 30} cy="82" r="4" fill="#96c115" />
                </svg>
              </div>

              {/* Time Scrubber Slider Control */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-gray-500">0m</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={flameTimeline}
                  onChange={(e) => setFlameTimeline(parseFloat(e.target.value))}
                  className="w-full accent-[#4e6700] cursor-pointer h-1.5 bg-gray-200 rounded-lg"
                />
                <span className="text-[10px] font-mono text-gray-500">10m</span>
              </div>
            </div>
          </div>

          {/* 4. APAC Regional Compliance Matrix (Hotspot 4 Target) */}
          <div id="target-4" className="rounded-xl border border-[#747964] overflow-hidden shadow-sm">
            {/* Table Header Controls */}
            <div className="bg-[#5c5e67] px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-2">
              <h4 className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider uppercase">
                APAC REGIONAL COMPLIANCE MATRIX
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-200 uppercase hidden sm:inline">Filter Region:</span>
                <select
                  value={filteredRegion}
                  onChange={(e) => setFilteredRegion(e.target.value)}
                  className="bg-[#2d3132] text-white text-[11px] font-mono py-1 px-2 rounded border border-gray-500 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Regions (7)</option>
                  {COMPLIANCE_RECORDS.map((r) => (
                    <option key={r.region} value={r.region}>
                      {r.region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#e6e9ea] border-b border-[#747964]">
                    <th className="p-3 sm:p-4 font-bold text-[#181c1d]">Region</th>
                    <th className="p-3 sm:p-4 font-bold text-[#181c1d]">Local Code</th>
                    <th className="p-3 sm:p-4 font-bold text-[#181c1d]">Tested Standard</th>
                    <th className="p-3 sm:p-4 font-bold text-[#181c1d]">Status</th>
                    <th className="p-3 sm:p-4 font-bold text-[#181c1d] text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c4c9b0]">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record, i) => (
                      <tr
                        key={record.region}
                        className={`transition-colors hover:bg-[#ebeeef] ${
                          i % 2 === 0 ? 'bg-white' : 'bg-[#f1f4f5]'
                        }`}
                      >
                        <td className="p-3 sm:p-4 font-bold text-[#181c1d]">{record.region}</td>
                        <td className="p-3 sm:p-4 text-[#444936]">{record.code}</td>
                        <td className="p-3 sm:p-4 text-[#181c1d]">{record.standard}</td>
                        <td className="p-3 sm:p-4 text-[#4e6700] font-bold">
                          <span className="inline-flex items-center gap-1.5 bg-[#96c115]/20 text-[#384b00] px-2 py-0.5 rounded text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4e6700]"></span>
                            {record.status}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 text-right">
                          <button
                            onClick={onOpenPdf}
                            className="text-[#006591] hover:text-[#004a6c] underline font-bold text-xs cursor-pointer"
                          >
                            PDF Cert
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-gray-500 font-mono">
                        No compliance records matching query "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Dual CTAs (Hotspot 5 Target) */}
          <div
            id="target-5"
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-8 sm:py-12 border-t border-[#c4c9b0]"
          >
            <button
              onClick={onOpenConsult}
              className="flex items-center gap-2.5 bg-[#4e6700] hover:bg-[#384b00] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-sans font-bold text-base sm:text-lg shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">support_agent</span>
              Consult Specialist
            </button>

            <button
              onClick={onOpenPdf}
              className="flex items-center gap-2.5 border-2 border-[#006591] text-[#006591] hover:bg-[#006591]/10 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-sans font-bold text-base sm:text-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">download</span>
              Technical PDF
            </button>
          </div>
        </div>

        {/* HOTSPOTS OVERLAYS (NUMBREED BADGES 1 to 5) */}
        {showHotspots && (
          <>
            {HOTSPOTS.map((hotspot) => {
              const isActive = activeHotspot?.id === hotspot.id;
              const isPrimary = hotspot.accentColor === 'primary';

              return (
                <div
                  key={hotspot.id}
                  onClick={() => onSelectHotspot(hotspot)}
                  className="absolute z-30 group cursor-pointer transition-transform hover:scale-110"
                  style={{
                    top: hotspot.position.top,
                    left: hotspot.position.left || 'auto',
                    right: hotspot.position.right || 'auto',
                    bottom: hotspot.position.bottom || 'auto'
                  }}
                  title={`Hotspot #${hotspot.id}: ${hotspot.title}`}
                >
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    {/* Pulsing ring animation */}
                    <div
                      className="absolute inset-0 rounded-full hotspot-ring"
                      style={{
                        backgroundColor: isPrimary ? 'rgba(150, 193, 21, 0.4)' : 'rgba(0, 101, 145, 0.4)'
                      }}
                    ></div>

                    {/* Number Badge Circle */}
                    <div
                      className={`relative w-6 h-6 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 ${
                        isActive ? 'ring-2 ring-amber-400 scale-110' : ''
                      }`}
                      style={{
                        backgroundColor: isPrimary ? '#4e6700' : '#006591',
                        borderColor: '#ffffff'
                      }}
                    >
                      {hotspot.id}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
