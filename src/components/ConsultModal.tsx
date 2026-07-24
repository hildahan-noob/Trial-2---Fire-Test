import React, { useState } from 'react';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultModal: React.FC<ConsultModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    region: 'Singapore',
    inquiry: 'ASTM E84 vs EN 13501-1 Technical Fire Mapping'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-lg w-full border-2 border-[#96c115] shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-[#4e6700] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#96c115]">support_agent</span>
            <div>
              <h3 className="font-bold font-sans text-lg leading-tight">Consult Technical Specialist</h3>
              <p className="text-xs font-mono text-[#c4f34c]">Armacell Engineering & Compliance Advisory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#96c115]/20 text-[#4e6700] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                ✓
              </div>
              <h4 className="font-bold text-xl text-[#181c1d]">Consultation Request Received</h4>
              <p className="text-sm text-[#444936]">
                An Armacell Regional Technical Manager in <strong>{formData.region}</strong> will contact you within 4 business hours with certified compliance documentation for <strong>{formData.company || 'your project'}</strong>.
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="bg-[#4e6700] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#384b00] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#444936] mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Alex Mercer"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-[#c4c9b0] p-2 rounded text-sm focus:outline-none focus:border-[#4e6700] font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#444936] mb-1">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@engineering-corp.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-[#c4c9b0] p-2 rounded text-sm focus:outline-none focus:border-[#4e6700] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#444936] mb-1">
                    COMPANY / SPECIFIER
                  </label>
                  <input
                    type="text"
                    placeholder="Apex Engineering Ltd."
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full border border-[#c4c9b0] p-2 rounded text-sm focus:outline-none focus:border-[#4e6700] font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#444936] mb-1">
                    TARGET REGION
                  </label>
                  <select
                    value={formData.region}
                    onChange={e => setFormData({ ...formData, region: e.target.value })}
                    className="w-full border border-[#c4c9b0] p-2 rounded text-sm focus:outline-none focus:border-[#4e6700] font-mono bg-white"
                  >
                    <option value="Singapore">Singapore (SCDF CP 13)</option>
                    <option value="Australia">Australia (NCC Part C)</option>
                    <option value="Japan">Japan (JIS A 1321)</option>
                    <option value="South Korea">South Korea (KS F 2271)</option>
                    <option value="Malaysia">Malaysia (UBBL 1984)</option>
                    <option value="UAE / Middle East">UAE / Middle East (Civil Defence)</option>
                    <option value="Europe / UK">Europe / UK (EN 13501-1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#444936] mb-1">
                    PRIMARY TOPIC
                  </label>
                  <select
                    value={formData.inquiry}
                    onChange={e => setFormData({ ...formData, inquiry: e.target.value })}
                    className="w-full border border-[#c4c9b0] p-2 rounded text-sm focus:outline-none focus:border-[#4e6700] font-mono bg-white"
                  >
                    <option value="ASTM E84 vs EN 13501-1 Technical Fire Mapping">
                      Fire Standard Comparison
                    </option>
                    <option value="Thermal Conductivity K-Value Validation">
                      K-Value & Energy Efficiency
                    </option>
                    <option value="Condensation Prevention & Thickness Calculation">
                      Condensation Calculations
                    </option>
                    <option value="Custom Project Specification Approval">
                      Specifier Certification
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#444936] mb-1">
                  PROJECT SPECIFICATIONS & NOTES
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide project details e.g., operating temperature range, pipe diameter, local authority submission requirement..."
                  className="w-full border border-[#c4c9b0] p-2 rounded text-sm focus:outline-none focus:border-[#4e6700] font-sans"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#4e6700] text-white rounded text-sm font-bold hover:bg-[#384b00] transition-colors cursor-pointer shadow-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Request Specialist Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
