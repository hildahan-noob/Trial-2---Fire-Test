import React from 'react';
import { ScreenOption } from '../types';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenOption;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose, currentScreen }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-3xl w-full border-2 border-[#006591] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* PDF Viewer Header */}
        <div className="bg-[#006591] p-4 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#4ebdff]">picture_as_pdf</span>
            <div>
              <h3 className="font-bold font-sans text-base sm:text-lg">ARMACELL TECHNICAL SPECIFICATION DATA SHEET</h3>
              <p className="text-xs font-mono text-[#c9e6ff]">Ref: ARM-APAC-SPEC-2026-V41</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded font-mono flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">print</span> Print / Save PDF
            </button>
            <button onClick={onClose} className="text-white hover:text-gray-200 text-lg cursor-pointer ml-2">
              ✕
            </button>
          </div>
        </div>

        {/* PDF Document Preview Content */}
        <div className="p-6 sm:p-8 overflow-y-auto font-sans space-y-6 text-[#181c1d] bg-gray-50 flex-grow">
          {/* Document Header Logo & Ref */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-4">
            <div className="flex justify-between items-start border-b border-gray-200 pb-4">
              <div>
                <div className="text-[#4e6700] font-bold text-xl tracking-tight">ARMACELL INDUSTRIAL</div>
                <div className="text-xs text-gray-500 font-mono mt-0.5">Advanced Engineering Materials Division</div>
              </div>
              <div className="text-right text-xs font-mono text-gray-600">
                <div className="font-bold text-[#006591]">CERTIFIED SPECIFICATION SHEET</div>
                <div>ISO 9001 / ISO 14001 Quality Assured</div>
                <div>Issued: July 2026</div>
              </div>
            </div>

            {/* Document Title */}
            <div>
              <h2 className="text-xl font-bold text-[#006591]">{currentScreen.title}</h2>
              <p className="text-xs text-gray-600 mt-1">{currentScreen.subtitle}</p>
            </div>

            {/* Section 1: Product Technical Parameters */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-[#4e6700] border-b pb-1">
                1. Technical Classification & Fire Safety Performance
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-gray-100 p-3 rounded">
                <div>
                  <div className="text-gray-500">ASTM E84 Rating</div>
                  <div className="font-bold text-[#181c1d]">25 / 50 (Class A)</div>
                </div>
                <div>
                  <div className="text-gray-500">EN 13501-1 Euroclass</div>
                  <div className="font-bold text-[#181c1d]">B-s1, d0</div>
                </div>
                <div>
                  <div className="text-gray-500">Operating Range</div>
                  <div className="font-bold text-[#181c1d]">-50°C to +110°C</div>
                </div>
                <div>
                  <div className="text-gray-500">Water Vapor μ</div>
                  <div className="font-bold text-[#181c1d]">≥ 10,000</div>
                </div>
              </div>
            </div>

            {/* Section 2: APAC Compliance Matrix Extract */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-[#4e6700] border-b pb-1">
                2. Regional Building Code Cross-Reference
              </h4>
              <table className="w-full text-left font-mono text-xs border border-gray-200">
                <thead className="bg-[#e0e3e4]">
                  <tr>
                    <th className="p-2 border-b">Jurisdiction</th>
                    <th className="p-2 border-b">Local Standard</th>
                    <th className="p-2 border-b">ArmaFlex Test Result</th>
                    <th className="p-2 border-b">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[11px]">
                  <tr>
                    <td className="p-2">Singapore (SCDF)</td>
                    <td className="p-2">CP 13 / SS 553</td>
                    <td className="p-2">EN 13501-1 B-s1, d0</td>
                    <td className="p-2 font-bold text-[#4e6700]">Approved</td>
                  </tr>
                  <tr>
                    <td className="p-2">Australia (NCC)</td>
                    <td className="p-2">AS/NZS 1530.3</td>
                    <td className="p-2">Ignitability Index 0</td>
                    <td className="p-2 font-bold text-[#4e6700]">Approved</td>
                  </tr>
                  <tr>
                    <td className="p-2">United States</td>
                    <td className="p-2">NFPA 90A / 90B</td>
                    <td className="p-2">ASTM E84 25/50</td>
                    <td className="p-2 font-bold text-[#4e6700]">Approved</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Engineering Footnote */}
            <div className="pt-4 border-t text-[10px] text-gray-500 flex justify-between items-center font-mono">
              <div>Verification Hash: 8f9a2e3b-armacell-spec</div>
              <div>Page 1 of 1</div>
            </div>
          </div>
        </div>

        {/* PDF Modal Footer Actions */}
        <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center shrink-0">
          <span className="text-xs text-gray-500 font-mono">Ready for specifier submission</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-xs font-bold hover:bg-gray-50 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-[#006591] text-white rounded text-xs font-bold hover:bg-[#004c6e] cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">download</span> Download PDF Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
