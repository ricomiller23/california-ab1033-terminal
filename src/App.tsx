import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ParcelExplorer } from './components/ParcelExplorer';
import { ModelMatcher } from './components/ModelMatcher';
import { ArbitrageCalculator } from './components/ArbitrageCalculator';
import { CadastralMap } from './components/CadastralMap';
import { OutreachCRM } from './components/OutreachCRM';
import { DossierModal } from './components/DossierModal';
import { PARCEL_LEADS } from './data/parcels';
import { ADU_MODELS } from './data/models';
import { ParcelLead } from './types';
import { 
  Building2, TrendingUp, Layers, CheckCircle2, ShieldCheck, 
  MapPin, Scale, FileText, Landmark, ArrowUpRight, DollarSign 
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'parcels' | 'models' | 'calculator' | 'cadastral' | 'outreach'>('parcels');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedParcel, setSelectedParcel] = useState<ParcelLead>(PARCEL_LEADS[0]);
  const [dossierParcel, setDossierParcel] = useState<ParcelLead | null>(null);

  // Aggregated KPIs
  const totalParcelsCount = PARCEL_LEADS.length;
  const totalArbitrageGain = useMemo(() => {
    return PARCEL_LEADS.reduce((acc, p) => acc + p.netEquityGain, 0);
  }, []);
  const totalMarketCap = useMemo(() => {
    return PARCEL_LEADS.reduce((acc, p) => acc + p.estimatedCondoSalePrice, 0);
  }, []);

  const handleSelectParcel = (parcel: ParcelLead) => {
    setSelectedParcel(parcel);
  };

  const handleOpenDossier = (parcel: ParcelLead) => {
    setDossierParcel(parcel);
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedCity={selectedCity} 
        setSelectedCity={setSelectedCity} 
      />

      {/* Institutional Macro Ribbon */}
      <div className="bg-[#0B132B]/80 border-b border-[#1E293B] py-2.5 px-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              LIVE FEED:
            </span>
            <span className="text-slate-300">
              California Assembly Bill 1033 (Deeded ADU Condominium Subdivision)
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400 font-mono">
              Gov. Code § 65852.28 Active
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <div className="text-slate-400">
              Target Parcels: <span className="text-white font-bold">{totalParcelsCount} Qualified</span>
            </div>
            <div className="text-slate-400">
              Condo Market Cap: <span className="text-emerald-400 font-bold">${(totalMarketCap / 1000000).toFixed(2)}M</span>
            </div>
            <div className="text-slate-400">
              Gross Arbitrage: <span className="text-sky-400 font-bold">+${(totalArbitrageGain / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Dynamic View Swapper */}
        {activeTab === 'parcels' && (
          <ParcelExplorer 
            onSelectParcel={(p) => {
              handleSelectParcel(p);
              setActiveTab('cadastral');
            }}
            onOpenDossier={handleOpenDossier}
          />
        )}

        {activeTab === 'models' && (
          <ModelMatcher />
        )}

        {activeTab === 'calculator' && (
          <ArbitrageCalculator />
        )}

        {activeTab === 'cadastral' && (
          <CadastralMap 
            selectedParcel={selectedParcel}
            onSelectParcel={handleSelectParcel}
          />
        )}

        {activeTab === 'outreach' && (
          <OutreachCRM />
        )}
      </main>

      {/* Executive Institutional Footer */}
      <footer className="mt-auto border-t border-[#1E293B] bg-[#0A0F1D] py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>CA-CONDO.TECH · California AB 1033 Deeded Condominium Terminal</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Engineered under California Assembly Bill 1033 (Ting, 2023), amending Gov. Code § 65852.28 and § 66410+ (Subdivision Map Act). Empowers California single-family homeowners and real estate portfolios to partition accessory dwelling units (ADUs) into fee-simple deeded condominiums for separate conveyance, capital liquidity, and generational wealth creation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-mono text-[11px]">
            <div>
              <div className="text-slate-500 uppercase tracking-wider">Statutory Authority</div>
              <div className="text-slate-300 mt-0.5">Cal. Gov. Code § 65852.28</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase tracking-wider">Subdivision Map Act</div>
              <div className="text-slate-300 mt-0.5">Cal. Gov. Code § 66410+</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase tracking-wider">HOA Governance</div>
              <div className="text-slate-300 mt-0.5">Davis-Stirling Act § 4000+</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-600">
          <span>© 2026 CA-CONDO.TECH · Institutional Build Collaboration (Gemini 2.5 Pro & Claude 3.7 Sonnet)</span>
          <span>Integrated with 15 Qualified California Property Manager Filings (October 1, 2026)</span>
        </div>
      </footer>

      {/* Institutional Feasibility Dossier Modal */}
      <DossierModal 
        parcel={dossierParcel}
        onClose={() => setDossierParcel(null)}
      />
    </div>
  );
}

export default App;
