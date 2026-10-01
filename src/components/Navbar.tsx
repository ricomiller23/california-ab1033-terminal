import React from 'react';
import { Building2, ShieldCheck, FileCheck, Layers, Calculator, MapPin, Send, ExternalLink } from 'lucide-react';

interface NavbarProps {
  activeTab: 'parcels' | 'models' | 'calculator' | 'cadastral' | 'outreach';
  setActiveTab: (tab: 'parcels' | 'models' | 'calculator' | 'cadastral' | 'outreach') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0B1220] border-b border-[#1E293B] text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-display">
                CA-CONDO.TECH
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                AB 1033 DEEDED CONDO TERMINAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Institutional ADU Subdivision Feasibility & Cadastral Valuation Engine · State of California
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-[#0F172A] p-1 rounded-xl border border-[#1E293B] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('parcels')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'parcels' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>15 Target Parcels</span>
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'models' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architectural Blueprints</span>
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Condo Arbitrage Pro-Forma</span>
          </button>
          <button
            onClick={() => setActiveTab('cadastral')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'cadastral' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Cadastral Plot Map</span>
          </button>
          <button
            onClick={() => setActiveTab('outreach')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'outreach' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Property Manager CRM</span>
          </button>
        </nav>

        {/* Status Pill */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            CALIFORNIA GOV CODE § 65852.2 VERIFIED
          </span>
        </div>
      </div>
    </header>
  );
};
