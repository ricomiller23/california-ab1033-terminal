import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, TrendingUp, Landmark, ShieldCheck, ArrowRight, PieChart, Sparkles } from 'lucide-react';

export const ArbitrageCalculator: React.FC = () => {
  // Financial parameters state
  const [constructionCost, setConstructionCost] = useState<number>(245000);
  const [condoSalePrice, setCondoSalePrice] = useState<number>(535000);
  const [monthlyRent, setMonthlyRent] = useState<number>(3600);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [holdingYears, setHoldingYears] = useState<number>(5);

  // Computed Pro-Forma
  const loanAmount = constructionCost * (1 - downPaymentPercent / 100);
  const downPaymentAmount = constructionCost * (downPaymentPercent / 100);
  
  // Monthly mortgage (P&I)
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 30 * 12;
  const monthlyPI = loanAmount > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : 0;

  const monthlyTaxesInsurance = (constructionCost * 0.0125) / 12; // Property tax & hazard
  const monthlyMaintenanceReserve = monthlyRent * 0.05; // 5% reserve
  const totalMonthlyExpenses = monthlyPI + monthlyTaxesInsurance + monthlyMaintenanceReserve;
  const netMonthlyCashFlow = monthlyRent - totalMonthlyExpenses;
  const annualNOI = (monthlyRent * 12) - ((monthlyTaxesInsurance + monthlyMaintenanceReserve) * 12);
  const capRate = ((annualNOI / constructionCost) * 100);
  const cashOnCashReturn = downPaymentAmount > 0 ? ((netMonthlyCashFlow * 12) / downPaymentAmount) * 100 : 0;

  // Immediate Condo Sale Calculations
  const closingCosts = condoSalePrice * 0.055; // 5.5% commissions, title & escrow
  const netCondoSaleProceeds = condoSalePrice - constructionCost - closingCosts;
  const roiOnCost = (netCondoSaleProceeds / constructionCost) * 100;

  // 10-Year Future Wealth Projections (Assume 3.5% property appreciation & 3% rent growth)
  const futureAppreciatedCondoValue = condoSalePrice * Math.pow(1.035, holdingYears);
  const cumulativeRentalCashFlow = netMonthlyCashFlow * 12 * holdingYears * 1.05;
  const totalHoldWealth = cumulativeRentalCashFlow + (futureAppreciatedCondoValue - condoSalePrice);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#1E293B] p-5 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
              AB 1033 INSTITUTIONAL MODEL
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 font-display">
              California Condominium Sale vs. Rental Arbitrage Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Compare immediate six-figure capital liquidity from deeded condominium conveyance under Assembly Bill 1033 against long-term high-yield residential cash flow.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-[#090D16] border border-[#1E293B] text-xs font-mono text-cyan-400">
            Formula: Net Arbitrage = V(Condo) - C(Turnkey) - T(Title/Escrow)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Input Controls */}
        <div className="lg:col-span-5 bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 shadow-sm space-y-5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#1E293B] pb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            Underwriting & Capital Inputs
          </h3>

          {/* Construction Turnkey Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Turnkey Construction Cost:</span>
              <strong className="text-white">${constructionCost.toLocaleString()}</strong>
            </div>
            <input
              type="range"
              min={120000}
              max={380000}
              step={5000}
              value={constructionCost}
              onChange={(e) => setConstructionCost(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-[#090D16] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$120k (Studio)</span>
              <span>$245k (3-Bed Villa)</span>
              <span>$380k (Luxury 1.2k sqft)</span>
            </div>
          </div>

          {/* Deeded Condo Valuation Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Deeded Standalone Condo Value:</span>
              <strong className="text-cyan-400">${condoSalePrice.toLocaleString()}</strong>
            </div>
            <input
              type="range"
              min={280000}
              max={850000}
              step={10000}
              value={condoSalePrice}
              onChange={(e) => setCondoSalePrice(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-[#090D16] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$280k</span>
              <span>$535k (Coastal Median)</span>
              <span>$850k (La Jolla / Venice)</span>
            </div>
          </div>

          {/* Projected Monthly Rent Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Projected Monthly Rent:</span>
              <strong className="text-indigo-400">${monthlyRent.toLocaleString()} / mo</strong>
            </div>
            <input
              type="range"
              min={1800}
              max={5500}
              step={50}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-[#090D16] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$1,800/mo</span>
              <span>$3,600/mo</span>
              <span>$5,500/mo</span>
            </div>
          </div>

          {/* Financing Toggles */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1E293B]">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Down Payment (%)</label>
              <select
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full bg-[#090D16] border border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={10}>10% ($ {(constructionCost * 0.10).toLocaleString()})</option>
                <option value={20}>20% ($ {(constructionCost * 0.20).toLocaleString()})</option>
                <option value={30}>30% ($ {(constructionCost * 0.30).toLocaleString()})</option>
                <option value={100}>100% All Cash ($ {constructionCost.toLocaleString()})</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Interest Rate (%)</label>
              <select
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-[#090D16] border border-[#1E293B] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={5.5}>5.50% (Prime)</option>
                <option value={6.5}>6.50% (Current 2026)</option>
                <option value={7.5}>7.50% (HELOC / Private)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Arbitrage Outcomes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* OPTION 1: Immediate Condo Sale */}
            <div className="bg-[#0F172A] border border-emerald-500/40 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-bl">
                AB 1033 LIQUIDITY
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Option A: Immediate Condominium Sale
              </span>
              <div className="text-3xl font-black text-white font-mono">
                +${Math.max(0, netCondoSaleProceeds).toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 font-mono block">
                Net Profit After Construction & 5.5% Title/Escrow
              </span>

              <div className="space-y-1.5 pt-2 border-t border-[#1E293B] text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Gross Condo Value:</span>
                  <span className="text-white">${condoSalePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Turnkey Cost:</span>
                  <span className="text-rose-400">-${constructionCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Title & Escrow (5.5%):</span>
                  <span className="text-rose-400">-${closingCosts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-400 pt-1 border-t border-[#1E293B]">
                  <span>Return on Cost (ROC):</span>
                  <span>{roiOnCost.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* OPTION 2: Long-Term Rental Cash Flow */}
            <div className="bg-[#0F172A] border border-cyan-500/40 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-cyan-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-bl">
                CASH-ON-CASH YIELD
              </div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                Option B: Hold as Rental Asset
              </span>
              <div className="text-3xl font-black text-white font-mono">
                +${netMonthlyCashFlow.toFixed(0)} <span className="text-xs font-normal text-slate-400">/ mo</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono block">
                Net Monthly Cash Flow After Debt Service
              </span>

              <div className="space-y-1.5 pt-2 border-t border-[#1E293B] text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Monthly Debt Service (P&I):</span>
                  <span className="text-rose-400">-${monthlyPI.toFixed(0)}/mo</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax & Insurance Reserve:</span>
                  <span className="text-rose-400">-${(monthlyTaxesInsurance + monthlyMaintenanceReserve).toFixed(0)}/mo</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cap Rate:</span>
                  <span className="text-white">{capRate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between font-bold text-cyan-400 pt-1 border-t border-[#1E293B]">
                  <span>Cash-on-Cash Return:</span>
                  <span>{downPaymentPercent === 100 ? `${capRate.toFixed(1)}%` : `${cashOnCashReturn.toFixed(1)}%`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Long-term Wealth Arbitrage Box */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                5-Year Cumulative Equity & Cash Flow Projection
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                Total Wealth: +${totalHoldWealth.toFixed(0).toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              If held for 5 years, the ADU produces <strong>${cumulativeRentalCashFlow.toFixed(0).toLocaleString()}</strong> in cumulative net rental income, while the standalone condominium footprint appreciates by <strong>${(futureAppreciatedCondoValue - condoSalePrice).toFixed(0).toLocaleString()}</strong> (assuming standard 3.5% annual Southern California coastal appreciation).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
