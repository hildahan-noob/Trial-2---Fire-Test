import React from 'react';
import { HOTSPOTS } from '../data/mockData';

interface UxAuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHotspot: (id: number) => void;
}

export const UxAuditDrawer: React.FC<UxAuditDrawerProps> = ({ isOpen, onClose, onSelectHotspot }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-[#c4c9b0] flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="bg-[#4e6700] p-4 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#c4f34c]">analytics</span>
            <div>
              <h3 className="font-bold text-base">UX PERFORMANCE AUDIT</h3>
              <p className="text-[11px] font-mono text-[#c4f34c]">Armacell Screen_41 Analytics Summary</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-lg cursor-pointer">
            ✕
          </button>
        </div>

        {/* Drawer Body Metrics */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow font-sans text-[#181c1d]">
          {/* High-Level KPI Comparison Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-[#444936]">
              Key Impact Metrics (Before vs After)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f1f4f5] border border-[#c4c9b0] p-3 rounded-lg">
                <div className="text-[10px] font-mono text-[#747964]">CONVERSION UPLIFT</div>
                <div className="text-2xl font-bold text-[#4e6700]">+42.8%</div>
                <div className="text-[10px] font-mono text-gray-500 mt-1">2.8% → 4.0% Specifiers</div>
              </div>
              <div className="bg-[#f1f4f5] border border-[#c4c9b0] p-3 rounded-lg">
                <div className="text-[10px] font-mono text-[#747964]">BOUNCE RATE</div>
                <div className="text-2xl font-bold text-[#006591]">-38.2%</div>
                <div className="text-[10px] font-mono text-gray-500 mt-1">68% → 42% Single-page</div>
              </div>
              <div className="bg-[#f1f4f5] border border-[#c4c9b0] p-3 rounded-lg">
                <div className="text-[10px] font-mono text-[#747964]">SPEC DOWNLOADS</div>
                <div className="text-2xl font-bold text-[#4e6700]">3.2x</div>
                <div className="text-[10px] font-mono text-gray-500 mt-1">310 → 992 PDFs / mo</div>
              </div>
              <div className="bg-[#f1f4f5] border border-[#c4c9b0] p-3 rounded-lg">
                <div className="text-[10px] font-mono text-[#747964]">AVG TIME ON PAGE</div>
                <div className="text-2xl font-bold text-[#006591]">2m 30s</div>
                <div className="text-[10px] font-mono text-gray-500 mt-1">+1m 45s Deep Engagement</div>
              </div>
            </div>
          </div>

          {/* Hotspot Rationale Breakdown List */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-[#444936]">
              Redesign Rationale Hotspots (1 - 5)
            </h4>
            <div className="space-y-2.5">
              {HOTSPOTS.map((hotspot) => (
                <div
                  key={hotspot.id}
                  onClick={() => {
                    onSelectHotspot(hotspot.id);
                    onClose();
                  }}
                  className="p-3 border border-gray-200 hover:border-[#4e6700] rounded-lg bg-gray-50 hover:bg-white transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs font-bold text-[#4e6700] group-hover:underline">
                      #{hotspot.id} {hotspot.title}
                    </span>
                    <span className="text-[10px] font-mono bg-gray-200 px-1.5 py-0.5 rounded text-gray-700">
                      {hotspot.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{hotspot.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-gray-100 border-t border-gray-200 shrink-0 flex justify-between items-center">
          <span className="text-xs font-mono text-gray-500">Armacell UX Design System</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4e6700] text-white rounded text-xs font-bold hover:bg-[#384b00] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
