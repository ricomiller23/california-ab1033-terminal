import React, { useState } from 'react';
import { ADU_MODELS } from '../data/models';
import { AduModel } from '../types';
import { Layers, Bed, Bath, Clock, DollarSign, CheckCircle2, Zap, ArrowRight, ShieldCheck, SunMedium } from 'lucide-react';

export const ModelMatcher: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AduModel>(ADU_MODELS[2]); // Default to Villa 1000

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-[#0F172A] border border-[#1E293B] p-5 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
              HCD PRE-APPROVED BLUEPRINTS
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 font-display">
              California Precision Modular ADU Architectures
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Standardized modular footprints engineered specifically for California Title 24 energy compliance, 4ft property line setbacks (CA Gov Code § 65852.2), and independent condominium utility sub-metering under AB 1033.
            </p>
          </div>
          <div className="text-right font-mono">
            <span className="text-[11px] text-slate-500 block">Typical Permit Duration</span>
            <strong className="text-emerald-400 text-sm">30-45 Days Fast-Track</strong>
          </div>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ADU_MODELS.map(model => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedModel.id === model.id
                ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                : 'bg-[#0F172A] border-[#1E293B] hover:border-slate-700 text-slate-400'
            }`}
          >
            <span className="text-[10px] font-mono text-slate-400 uppercase block">{model.series}</span>
            <strong className="text-white text-sm block mt-0.5">{model.name}</strong>
            <div className="flex items-center gap-3 mt-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold">{model.squareFeet} sq ft</span>
              <span className="text-slate-400">{model.bedrooms === 0 ? 'Studio' : `${model.bedrooms} Bed`} · {model.bathrooms} Bath</span>
            </div>
            <div className="mt-2 text-xs text-cyan-400 font-bold font-mono">
              ${(model.turnkeyCost / 1000).toFixed(0)}k Turn-Key
            </div>
          </button>
        ))}
      </div>

      {/* Detailed Blueprint & Architectural Spec Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Blueprint Schematic Visualizer */}
        <div className="lg:col-span-7 bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Floorplan Architectural Schematic · {selectedModel.dimensions}
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">Scale: 1/4" = 1'-0" · Independent Sub-Metered Utility Service</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#090D16] border border-[#1E293B] text-[11px] font-mono text-cyan-400 font-bold">
              {selectedModel.squareFeet} SQ FT GROSS
            </span>
          </div>

          {/* SVG Floorplan Blueprint Rendering */}
          <div className="bg-[#090D16] border border-cyan-900/40 rounded-xl p-6 relative overflow-hidden flex items-center justify-center min-h-[300px]">
            <svg viewBox="0 0 500 350" className="w-full max-h-[300px] text-slate-300 font-mono text-[10px]">
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Outer Wall Envelope */}
              <rect x="50" y="40" width="400" height="270" rx="4" fill="#0B132B" stroke="#06B6D4" strokeWidth="3" />
              
              {/* Room Divisions based on model */}
              {selectedModel.id === 'studio-400' ? (
                <>
                  <rect x="50" y="40" width="250" height="190" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="120" y="140" fill="#E2E8F0" fontWeight="bold">LIVING / SLEEPING SUITE</text>
                  <text x="145" y="160" fill="#94A3B8">240 sq ft</text>

                  <rect x="300" y="40" width="150" height="130" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="330" y="105" fill="#E2E8F0" fontWeight="bold">FULL BATH & W/D</text>

                  <rect x="300" y="170" width="150" height="140" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="325" y="240" fill="#E2E8F0" fontWeight="bold">CHEF GALLEY KITCHEN</text>

                  <rect x="50" y="230" width="250" height="80" fill="#064E3B" fillOpacity="0.4" stroke="#10B981" strokeWidth="1.5" />
                  <text x="110" y="275" fill="#34D399" fontWeight="bold">DEEDED PRIVATE PATIO (AB 1033)</text>
                </>
              ) : selectedModel.id === 'pacifica-750' ? (
                <>
                  <rect x="50" y="40" width="180" height="150" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="90" y="115" fill="#E2E8F0" fontWeight="bold">PRIMARY BEDROOM</text>
                  <text x="115" y="135" fill="#94A3B8">160 sq ft</text>

                  <rect x="50" y="190" width="180" height="120" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="95" y="250" fill="#E2E8F0" fontWeight="bold">BEDROOM 2 / OFFICE</text>

                  <rect x="230" y="40" width="220" height="180" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="280" y="125" fill="#E2E8F0" fontWeight="bold">OPEN GREAT ROOM & ISLAND</text>

                  <rect x="230" y="220" width="120" height="90" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="250" y="270" fill="#E2E8F0" fontWeight="bold">BATH & LAUNDRY</text>

                  <rect x="350" y="220" width="100" height="90" fill="#064E3B" fillOpacity="0.4" stroke="#10B981" strokeWidth="1.5" />
                  <text x="365" y="270" fill="#34D399" fontWeight="bold">PORCH ENTRY</text>
                </>
              ) : (
                <>
                  <rect x="50" y="40" width="160" height="140" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="75" y="110" fill="#E2E8F0" fontWeight="bold">MASTER SUITE + ENSUITE</text>

                  <rect x="50" y="180" width="160" height="130" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="80" y="245" fill="#E2E8F0" fontWeight="bold">BED 2 & BED 3 GUEST WING</text>

                  <rect x="210" y="40" width="240" height="180" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="260" y="125" fill="#E2E8F0" fontWeight="bold">OPEN CONCEPT GREAT ROOM</text>
                  <text x="280" y="145" fill="#94A3B8">Vaulted Ceilings</text>

                  <rect x="210" y="220" width="130" height="90" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                  <text x="230" y="270" fill="#E2E8F0" fontWeight="bold">BATH 2 & UTILITY</text>

                  <rect x="340" y="220" width="110" height="90" fill="#064E3B" fillOpacity="0.4" stroke="#10B981" strokeWidth="1.5" />
                  <text x="350" y="270" fill="#34D399" fontWeight="bold">CALIFORNIA ROOM</text>
                </>
              )}

              {/* Utility Tie-In Indicators */}
              <circle cx="65" cy="55" r="5" fill="#F59E0B" />
              <text x="75" y="58" fill="#F59E0B" fontSize="8">100A SUB-PANEL</text>

              <circle cx="430" cy="55" r="5" fill="#3B82F6" />
              <text x="350" y="58" fill="#60A5FA" fontSize="8">WATER & SEWER TIE-IN</text>
            </svg>
          </div>

          {/* Construction Features Bullet List */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Engineered Architectural Inclusions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedModel.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 bg-[#090D16] p-2 rounded-lg border border-[#1E293B]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financial Arbitrage & Specs */}
        <div className="lg:col-span-5 space-y-4">
          {/* Financial Breakdown Card */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              AB 1033 Financial Arbitrage Profile
            </span>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center bg-[#090D16] p-3 rounded-lg border border-[#1E293B]">
                <span className="text-slate-400">Turnkey Construction Cost:</span>
                <strong className="text-white text-sm">${selectedModel.turnkeyCost.toLocaleString()}</strong>
              </div>

              <div className="flex justify-between items-center bg-[#090D16] p-3 rounded-lg border border-[#1E293B]">
                <span className="text-slate-400">Standalone Deeded Condo Valuation:</span>
                <strong className="text-cyan-400 text-sm">${selectedModel.estimatedCondoSale.toLocaleString()}</strong>
              </div>

              <div className="flex justify-between items-center bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/80">
                <span className="text-emerald-300 font-semibold">Immediate Condo Sale Liquidity Gain:</span>
                <strong className="text-emerald-400 text-base font-black">
                  +${(selectedModel.estimatedCondoSale - selectedModel.turnkeyCost).toLocaleString()}
                </strong>
              </div>

              <div className="flex justify-between items-center bg-[#090D16] p-3 rounded-lg border border-[#1E293B]">
                <span className="text-slate-400">Projected Monthly Rental Cash Flow:</span>
                <strong className="text-indigo-400 text-sm">${selectedModel.projectedRent.toLocaleString()} / mo</strong>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-900/40 text-[11px] text-cyan-200 leading-relaxed font-sans">
              <strong>AB 1033 Statutory Authority:</strong> Under California Assembly Bill 1033, this ADU may be separately conveyed as a deeded condominium, allowing the homeowner to sell the newly constructed unit directly to a first-time homebuyer while retaining 100% ownership of the primary home.
            </div>
          </div>

          {/* Technical Specifications Card */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 shadow-sm space-y-3 text-xs font-mono">
            <span className="font-bold text-white uppercase tracking-wider block border-b border-[#1E293B] pb-2">
              Engineering & Building Specifications
            </span>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">Ceiling Height:</span>
                <span className="font-semibold text-white">{selectedModel.specs.ceilingHeight}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">HVAC Climate System:</span>
                <span className="font-semibold text-white">{selectedModel.specs.hvac}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">Rooftop Solar PV:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <SunMedium className="w-3.5 h-3.5 text-amber-400" /> {selectedModel.specs.solarKw} kW Array
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">Insulation & Acoustic:</span>
                <span className="font-semibold text-white">{selectedModel.specs.insulation}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Foundation Engineering:</span>
                <span className="font-semibold text-white">{selectedModel.specs.foundation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
