import React, { useState, useMemo } from 'react';
import { ParcelLead } from '../types';
import { PARCEL_LEADS } from '../data/parcels';
import { ADU_MODELS } from '../data/models';
import { Search, MapPin, CheckCircle2, Shield, DollarSign, Home, ArrowUpRight, Filter, ChevronRight, Layers, FileText } from 'lucide-react';

interface ParcelExplorerProps {
  onSelectParcel: (parcel: ParcelLead) => void;
  onOpenDossier: (parcel: ParcelLead) => void;
}

export const ParcelExplorer: React.FC<ParcelExplorerProps> = ({ onSelectParcel, onOpenDossier }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countyFilter, setCountyFilter] = useState('ALL');

  const counties = useMemo(() => {
    return ['ALL', ...Array.from(new Set(PARCEL_LEADS.map(p => p.county)))];
  }, []);

  const filteredParcels = useMemo(() => {
    return PARCEL_LEADS.filter(p => {
      const matchesSearch = p.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCounty = countyFilter === 'ALL' || p.county === countyFilter;
      return matchesSearch && matchesCounty;
    });
  }, [searchTerm, countyFilter]);

  const totalLotSqFt = PARCEL_LEADS.reduce((acc, p) => acc + p.lotAreaSqFt, 0);
  const totalCondoLiquidity = PARCEL_LEADS.reduce((acc, p) => acc + p.estimatedCondoSalePrice, 0);
  const totalNetEquityGain = PARCEL_LEADS.reduce((acc, p) => acc + p.netEquityGain, 0);

  return (
    <div className="space-y-6">
      {/* Top Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target California Parcels</span>
          <div className="text-2xl font-black text-white mt-1">15 Verified</div>
          <span className="text-[10px] text-emerald-400 font-mono">100% AB 1033 Opted-In / Right</span>
        </div>
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Audited Land Area</span>
          <div className="text-2xl font-black text-cyan-400 mt-1">{totalLotSqFt.toLocaleString()} sq ft</div>
          <span className="text-[10px] text-slate-400 font-mono">Avg: {(totalLotSqFt / PARCEL_LEADS.length).toFixed(0)} sq ft / parcel</span>
        </div>
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Deeded Condo Liquidity</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">${(totalCondoLiquidity / 1000000).toFixed(2)}M</div>
          <span className="text-[10px] text-emerald-400 font-mono">Gross Realizable Value</span>
        </div>
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Net Capital Gain Arbitrage</span>
          <div className="text-2xl font-black text-indigo-400 mt-1">${(totalNetEquityGain / 1000000).toFixed(2)}M</div>
          <span className="text-[10px] text-indigo-400 font-mono">Net of Modular Construction</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search parcel address, owner, city, or PM firm (e.g. Clairemont Mesa, Steve Welty, La Jolla)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#090D16] border border-[#1E293B] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> County:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
            {counties.map(c => (
              <button
                key={c}
                onClick={() => setCountyFilter(c)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  countyFilter === c
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-[#090D16] text-slate-400 hover:text-white border border-[#1E293B]'
                }`}
              >
                {c.replace(' County', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Parcel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredParcels.map(parcel => {
          const model = ADU_MODELS.find(m => m.id === parcel.recommendedModelId) || ADU_MODELS[0];
          return (
            <div
              key={parcel.id}
              className="bg-[#0F172A] border border-[#1E293B] hover:border-emerald-500/60 rounded-xl p-5 shadow-sm transition-all flex flex-col justify-between group space-y-4"
            >
              <div>
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2 border-b border-[#1E293B] pb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                    LEAD #{parcel.leadNumber} · {parcel.city.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 4FT SETBACK OK
                  </span>
                </div>

                {/* Property Main Info */}
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {parcel.propertyAddress}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {parcel.city}, CA {parcel.zip} · <span className="text-slate-300 font-medium">{parcel.companyName}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Assessor Parcel: {parcel.assessorParcelNumber} · {parcel.zoningCode}
                  </p>
                </div>

                {/* Parcel Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 bg-[#090D16] p-3 rounded-lg border border-[#1E293B] text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Lot Footprint</span>
                    <strong className="text-white text-sm">{parcel.lotAreaSqFt.toLocaleString()} sq ft</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Max ADU Allowed</span>
                    <strong className="text-emerald-400 text-sm">{parcel.maxAduSqFt} sq ft</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Condo Sale Price</span>
                    <strong className="text-cyan-400 text-sm">${(parcel.estimatedCondoSalePrice / 1000).toFixed(0)}k</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Monthly Rent</span>
                    <strong className="text-indigo-400 text-sm">${parcel.projectedMonthlyRent.toLocaleString()}/mo</strong>
                  </div>
                </div>

                {/* Recommended Blueprint Match */}
                <div className="mt-3 bg-emerald-950/20 border border-emerald-900/50 p-2.5 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-500 font-semibold block uppercase">Matched Model:</span>
                    <strong className="text-slate-200">{model.name}</strong>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">
                    +${(parcel.netEquityGain / 1000).toFixed(0)}k Net Equity
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onSelectParcel(parcel)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-slate-700 text-slate-200 font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Cadastral Plot</span>
                </button>
                <button
                  onClick={() => onOpenDossier(parcel)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Feasibility Dossier</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
