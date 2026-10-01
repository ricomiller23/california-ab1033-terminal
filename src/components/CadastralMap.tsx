import React, { useState } from 'react';
import { PARCEL_LEADS } from '../data/parcels';
import { ADU_MODELS } from '../data/models';
import { ParcelLead } from '../types';
import { Layers, ShieldCheck, CheckCircle2, MapPin, Ruler, FileText, CornerDownRight } from 'lucide-react';

interface CadastralMapProps {
  selectedParcel: ParcelLead;
  onSelectParcel: (parcel: ParcelLead) => void;
}

export const CadastralMap: React.FC<CadastralMapProps> = ({ selectedParcel, onSelectParcel }) => {
  const [showCondoSplit, setShowCondoSplit] = useState<boolean>(true);
  const [showSetbacks, setShowSetbacks] = useState<boolean>(true);
  const [showUtilities, setShowUtilities] = useState<boolean>(true);

  const matchedModel = ADU_MODELS.find(m => m.id === selectedParcel.recommendedModelId) || ADU_MODELS[2];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-[#0F172A] border border-[#1E293B] p-5 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
            CADASTRAL PARCEL SUBDIVISION ENGINE
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 font-display">
            Interactive Parcel Demarcation & Setback Plot Map
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Displaying deeded subdivision boundary for <strong>{selectedParcel.propertyAddress}, {selectedParcel.city}</strong> (APN: {selectedParcel.assessorParcelNumber}).
          </p>
        </div>

        {/* Parcel Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-mono">Select Target Parcel:</label>
          <select
            value={selectedParcel.id}
            onChange={(e) => {
              const p = PARCEL_LEADS.find(item => item.id === e.target.value);
              if (p) onSelectParcel(p);
            }}
            className="bg-[#090D16] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
          >
            {PARCEL_LEADS.map(p => (
              <option key={p.id} value={p.id}>
                #{p.leadNumber} · {p.propertyAddress}, {p.city} ({p.lotAreaSqFt} sq ft)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cadastral SVG Map */}
        <div className="lg:col-span-8 bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E293B] pb-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-slate-400">Layer Toggles:</span>
              <button
                onClick={() => setShowCondoSplit(!showCondoSplit)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                  showCondoSplit ? 'bg-emerald-600 text-white font-bold' : 'bg-[#090D16] text-slate-400 border border-[#1E293B]'
                }`}
              >
                AB 1033 Condo Split Line
              </button>
              <button
                onClick={() => setShowSetbacks(!showSetbacks)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                  showSetbacks ? 'bg-cyan-600 text-white font-bold' : 'bg-[#090D16] text-slate-400 border border-[#1E293B]'
                }`}
              >
                4ft Statutory Setbacks
              </button>
              <button
                onClick={() => setShowUtilities(!showUtilities)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                  showUtilities ? 'bg-amber-600 text-white font-bold' : 'bg-[#090D16] text-slate-400 border border-[#1E293B]'
                }`}
              >
                Sub-Meter Utilities
              </button>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              Total Parcel Area: {selectedParcel.lotAreaSqFt.toLocaleString()} sq ft
            </span>
          </div>

          {/* Interactive Cadastral Plot SVG */}
          <div className="bg-[#090D16] border border-slate-800 rounded-xl p-6 relative overflow-hidden flex items-center justify-center min-h-[420px]">
            <svg viewBox="0 0 700 480" className="w-full max-h-[420px] font-mono text-[10px]">
              {/* Cadastral Grid */}
              <defs>
                <pattern id="cadGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cadGrid)" />

              {/* Outer Property Boundary (Lot) */}
              <rect x="50" y="40" width="600" height="390" fill="#0B132B" fillOpacity="0.8" stroke="#38BDF8" strokeWidth="2.5" />
              <text x="60" y="32" fill="#38BDF8" fontWeight="bold">NORTH PROPERTY LINE (100.00 FT)</text>
              <text x="60" y="445" fill="#38BDF8" fontWeight="bold">SOUTH PROPERTY LINE / CLAIREMONT MESA BLVD (100.00 FT)</text>
              <text x="5" y="240" fill="#38BDF8" fontWeight="bold" transform="rotate(-90 20 240)">WEST SETBACK (74.00 FT)</text>

              {/* 4ft Statutory Setback Buffer (Gov Code § 65852.2) */}
              {showSetbacks && (
                <rect
                  x="70"
                  y="60"
                  width="560"
                  height="350"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
              )}

              {/* Existing Primary Home (PDU) */}
              <rect x="90" y="80" width="280" height="200" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" rx="4" />
              <text x="130" y="170" fill="#FFFFFF" fontWeight="bold" fontSize="12">EXISTING PRIMARY RESIDENCE</text>
              <text x="160" y="190" fill="#94A3B8">{selectedParcel.existingHomeSqFt.toLocaleString()} sq ft · Deeded Unit #1</text>

              {/* AB 1033 Condominium Demarcation Split Line */}
              {showCondoSplit && (
                <>
                  <line x1="400" y1="40" x2="400" y2="430" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6,4" />
                  <rect x="340" y="45" width="120" height="20" rx="3" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
                  <text x="345" y="58" fill="#34D399" fontWeight="bold" fontSize="8">AB 1033 CONDO SPLIT LINE</text>
                </>
              )}

              {/* Detached ADU Condominium Footprint (Unit #2) */}
              <rect x="430" y="100" width="190" height="180" fill="#064E3B" fillOpacity="0.7" stroke="#10B981" strokeWidth="2.5" rx="4" />
              <text x="445" y="180" fill="#A7F3D0" fontWeight="bold" fontSize="11">{matchedModel.name.toUpperCase()}</text>
              <text x="470" y="200" fill="#6EE7B7">{matchedModel.squareFeet} sq ft · Deeded Unit #2</text>
              <text x="450" y="220" fill="#FDE047" fontWeight="bold">CONDO VALUATION: ${(selectedParcel.estimatedCondoSalePrice / 1000).toFixed(0)}k</text>

              {/* Private Deeded Yard / Outdoor Patio */}
              <rect x="430" y="295" width="190" height="110" fill="#0F766E" fillOpacity="0.3" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="455" y="355" fill="#5EEAD4" fontWeight="bold">DEEDED PRIVATE PATIO / HOA COMMON</text>

              {/* Utility Tie-ins */}
              {showUtilities && (
                <>
                  {/* Sewer lateral */}
                  <path d="M 430 140 L 370 140 L 370 340 L 50 340" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,2" />
                  <text x="210" y="335" fill="#60A5FA" fontSize="8">INDEPENDENT SEWER LATERAL TIE-IN</text>

                  {/* Electrical sub-panel */}
                  <path d="M 430 250 L 370 250 L 370 420 L 250 420" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,2" />
                  <text x="240" y="415" fill="#FBBF24" fontSize="8">100A SUB-METER ELECTRICAL CONDUIT</text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Right Column: Parcel Zoning & Legal Details */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 shadow-sm space-y-4 font-mono text-xs">
            <span className="font-bold text-white uppercase tracking-wider block border-b border-[#1E293B] pb-2">
              Statutory Zoning & Cadastral Audit
            </span>

            <div className="space-y-2.5 text-slate-300">
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">Jurisdiction:</span>
                <strong className="text-white">{selectedParcel.city}, California</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">Zoning Designation:</span>
                <span className="text-cyan-400 font-bold">{selectedParcel.zoningCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">AB 1033 Adoption:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                  {selectedParcel.ab1033Status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">Side & Rear Setback:</span>
                <span className="text-emerald-400 font-bold">4.0 ft (Gov Code § 65852.2)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                <span className="text-slate-400">Public Hearing / Variance:</span>
                <span className="text-emerald-400 font-bold">EXEMPT (Ministerial Approval)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Sewer Lateral Hookup:</span>
                <span className="text-white">{selectedParcel.sewerCapacity}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1E293B] bg-[#090D16] p-3 rounded-lg text-slate-400 font-sans text-xs leading-relaxed space-y-1">
              <strong className="text-emerald-400 block font-mono">CONDOMINIUM MAP FEASIBILITY:</strong>
              This parcel possesses sufficient lot width and rear depth to establish an independent deeded condominium parcel under California Government Code § 66412.3 (Subdivision Map Act exemption for AB 1033 ADU splits).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
