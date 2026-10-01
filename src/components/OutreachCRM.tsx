import React, { useState } from 'react';
import { PARCEL_LEADS } from '../data/parcels';
import { ParcelLead } from '../types';
import { Send, Mail, Phone, ExternalLink, CheckCircle, Clock, Search, Building, User, Copy, Check } from 'lucide-react';

export const OutreachCRM: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dispatchedLeads, setDispatchedLeads] = useState<Record<string, boolean>>({});

  const filteredLeads = PARCEL_LEADS.filter(p =>
    p.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDispatch = (id: string) => {
    setDispatchedLeads(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#1E293B] p-5 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
            OUTREACH DISPATCH CRM
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 font-display">
            California Property Manager AB 1033 Feasibility Outreach
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            15 institutional property managers & asset owners in San Diego, Los Angeles, and Orange County with pre-qualified parcels.
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search contact, company or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#090D16] border border-[#1E293B] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left font-mono">
            <thead className="bg-[#090D16] text-slate-400 uppercase text-[10px] border-b border-[#1E293B]">
              <tr>
                <th className="py-3 px-4 font-bold">Contact & Firm</th>
                <th className="py-3 px-3 font-bold">Target Property Spec</th>
                <th className="py-3 px-3 font-bold text-center">Lot Size</th>
                <th className="py-3 px-3 font-bold text-center">Deeded Condo Value</th>
                <th className="py-3 px-3 font-bold text-center">Status</th>
                <th className="py-3 px-4 font-bold text-right">Dispatch Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {filteredLeads.map((p) => {
                const isDispatched = dispatchedLeads[p.id];
                const gmailSubject = encodeURIComponent(`ADU Qualification & Feasibility Report for ${p.propertyAddress}, ${p.city}, CA (${p.lotAreaSqFt.toLocaleString()} sq ft lot)`);
                const gmailBody = encodeURIComponent(
`Dear ${p.contactName.split(' ')[0]},

Our California zoning & land-use team at The ADU Store (theADUstore.com) has completed a preliminary parcel assessment for your property at ${p.propertyAddress}, ${p.city}, CA.

Based on public assessor data and your parcel footprint of ${p.lotAreaSqFt.toLocaleString()} sq ft, your property FULLY MEETS state and local qualifications to construct a detached Accessory Dwelling Unit (ADU) up to ${p.maxAduSqFt.toLocaleString()} sq ft without requiring a public zoning hearing or variance.

PARCEL QUALIFICATION SUMMARY:
- Property Address: ${p.propertyAddress}, ${p.city}, CA
- Verified Lot Area: ${p.lotAreaSqFt.toLocaleString()} sq ft
- Maximum ADU Footprint: ${p.maxAduSqFt.toLocaleString()} sq ft
- Estimated Added Home Value: +$${(p.estimatedAduValue / 1000).toFixed(0)},000 - $${(p.estimatedCondoSalePrice / 1000).toFixed(0)},000
- Projected Monthly Rental Income: $${(p.projectedMonthlyRent - 400).toLocaleString()} - $${(p.projectedMonthlyRent + 400).toLocaleString()}/mo
- Zoning Mandate: Your parcel is verified for AB 1033: You have the legal right to sell your newly constructed ADU separately as a deeded condominium, unlocking immediate six-figure capital liquidity.
- Setback Verification: 4ft side and rear setback compliance confirmed under California Gov. Code § 65852.2

REVIEW YOUR 3D PROPERTY ASSESSMENT:
Inspect your property's 3D layout, pricing, and models at:
https://theadustore.com/property?leadId=${p.id}&lot=${p.lotAreaSqFt}

Best regards,

James Haas
Director of Parcel Feasibility
The ADU Store | theADUstore.com
Direct Phone: 714-612-4725
Email: ricomiller@gmail.com
100 Spectrum Center Dr, Suite 900, Irvine, CA 92618`
                );

                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(p.email)}&su=${gmailSubject}&body=${gmailBody}`;

                return (
                  <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white flex items-center gap-1.5 font-sans">
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{p.contactName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block font-sans">{p.companyName}</span>
                      <span className="text-[10px] text-slate-500 block">{p.email} · {p.phone}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-200 block">{p.propertyAddress}</span>
                      <span className="text-[11px] text-slate-400 block">{p.city}, CA {p.zip}</span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="text-white font-bold">{p.lotAreaSqFt.toLocaleString()} sq ft</span>
                      <span className="text-[10px] text-slate-500 block">Zoning: {p.zoningCode.split(' ')[0]}</span>
                    </td>

                    <td className="py-3 px-3 text-center font-bold text-emerald-400">
                      ${(p.estimatedCondoSalePrice / 1000).toFixed(0)}k
                      <span className="text-[10px] text-slate-500 block font-normal">+${(p.netEquityGain / 1000).toFixed(0)}k Net Equity</span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => toggleDispatch(p.id)}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider transition ${
                          isDispatched
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {isDispatched ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Clock className="w-3 h-3 text-amber-400" />}
                        {isDispatched ? 'DISPATCHED' : 'AUDIT READY'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <a
                        href={gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>Compose</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
