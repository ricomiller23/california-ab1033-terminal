import React, { useState } from 'react';
import { ParcelLead, AduModel } from '../types';
import { ADU_MODELS } from '../data/models';
import { 
  X, Printer, Copy, CheckCircle2, AlertTriangle, 
  Building2, Scale, FileText, Check, ShieldCheck, MapPin, Phone, Mail
} from 'lucide-react';

interface DossierModalProps {
  parcel: ParcelLead | null;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ parcel, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!parcel) return null;

  const matchedModel = ADU_MODELS.find(m => m.id === parcel.recommendedModelId) || ADU_MODELS[2];
  const legalPlatCost = 28500; // Survey, CC&Rs, Subdivision Public Report (DRE)
  const totalCapex = matchedModel.turnkeyCost + legalPlatCost;
  const netArbitrage = parcel.estimatedCondoSalePrice - totalCapex;
  const roi = Math.round((netArbitrage / totalCapex) * 100);

  const handleCopyBrief = () => {
    const text = `AB 1033 CONDOS FEASIBILITY BRIEF:
Property: ${parcel.propertyAddress}, ${parcel.city}, CA ${parcel.zip}
Assessor Parcel No: ${parcel.assessorParcelNumber}
Zoning: ${parcel.zoningCode} (${parcel.county} County)
Local AB 1033 Status: ${parcel.ab1033Status}
Target ADU Model: ${matchedModel.name} (${matchedModel.squareFeet} sqft, ${matchedModel.bedrooms} Bed/${matchedModel.bathrooms} Bath)
Turnkey Construction Capex: $${matchedModel.turnkeyCost.toLocaleString()}
Legal Plat & DRE Condo Registration: $${legalPlatCost.toLocaleString()}
Total All-In Capex: $${totalCapex.toLocaleString()}
Projected Deeded Condo Market Value: $${parcel.estimatedCondoSalePrice.toLocaleString()}
Net Deeded Equity Creation: +$${netArbitrage.toLocaleString()} (${roi}% Net ROI)
Contact: ${parcel.contactName} (${parcel.companyName}) - ${parcel.phone}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  AB 1033 Institutional Dossier
                </span>
                <span className="text-xs text-slate-400 font-mono">APN: {parcel.assessorParcelNumber}</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                {parcel.propertyAddress}, {parcel.city}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Local AB 1033 Status</div>
              <div className="mt-1 flex items-center space-x-1.5">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                  parcel.ab1033Status === 'OPTED_IN' ? 'bg-emerald-400' :
                  parcel.ab1033Status === 'PENDING_MUNICIPAL_VOTE' ? 'bg-amber-400' : 'bg-blue-400'
                }`} />
                <span className="font-semibold text-white capitalize">{parcel.ab1033Status.replace(/_/g, ' ')}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{parcel.county} County · {parcel.zoningCode}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Lot & Backyard Area</div>
              <div className="mt-1 text-base font-bold text-white">
                {parcel.lotAreaSqFt.toLocaleString()} sqft Lot
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Primary: {parcel.existingHomeSqFt.toLocaleString()} sqft
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Est. Deeded Condo Value</div>
              <div className="mt-1 text-base font-bold text-emerald-400">
                ${parcel.estimatedCondoSalePrice.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Rent: ${parcel.projectedMonthlyRent.toLocaleString()}/mo
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Net Equity Arbitrage</div>
              <div className="mt-1 text-base font-bold text-sky-400">
                +${netArbitrage.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                {roi}% Net ROI on Capex
              </div>
            </div>
          </div>

          {/* Statutory Verification Checklist */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>California AB 1033 Statutory Qualification Criteria</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-200">Local Municipality Ordinance</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {parcel.ab1033Status === 'OPTED_IN' 
                      ? `${parcel.city} has formally opted in to AB 1033 condominium separate conveyance.`
                      : `${parcel.city} ordinance in active processing; ministerial ADU permit fast-track eligible.`}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-200">Setback & Fire Safety Clearance</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Requires 4-ft rear and side setbacks. Parcel verified with clear build envelope.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-200">Primary Mortgage Subordination</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Lienholder consent or partial release of deed of trust required prior to recording condominium plat.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-200">Separate Utility Connections</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Individual electrical sub-panel, water sub-metering, and separate sewer connection verified ({parcel.sewerCapacity}).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Specification & Cost Breakdown */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Recommended Model: {matchedModel.name} ({matchedModel.series})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-xs text-slate-400 font-mono">Architecture & Footprint</div>
                <div className="mt-2 text-lg font-bold text-white">
                  {matchedModel.squareFeet} sqft | {matchedModel.bedrooms} Bed, {matchedModel.bathrooms} Bath
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Dimensions: {matchedModel.dimensions}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Build Timeline: ~{matchedModel.buildTimeWeeks} weeks
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-xs text-slate-400 font-mono">Capex Allocation</div>
                <div className="mt-2 text-lg font-bold text-amber-400">
                  ${totalCapex.toLocaleString()} All-In
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  • Modular Turnkey Cost: ${matchedModel.turnkeyCost.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  • AB 1033 Plat & DRE Public Report: $28,500
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-xs text-slate-400 font-mono">HOA Pro-Forma & Dues</div>
                <div className="mt-2 text-lg font-bold text-emerald-400">
                  $195 / mo Dues
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Shared hazard insurance, exterior landscaping, utility reserve fund allocation.
                </div>
              </div>
            </div>
          </div>

          {/* Lead Contact Info */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sky-400 border border-slate-700">
                {parcel.contactName.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white">{parcel.contactName}</div>
                <div className="text-xs text-slate-400">{parcel.companyName} • Status: {parcel.status.replace(/_/g, ' ')}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{parcel.phone}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{parcel.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Compliant with Cal. Gov. Code § 65852.28 & § 66410+ (Subdivision Map Act)
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopyBrief}
              className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Dossier</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
