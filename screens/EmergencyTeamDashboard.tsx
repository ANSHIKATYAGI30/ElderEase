
import React from 'react';
import { Incident } from '../types';
import { ArrowLeft, ShieldAlert, Phone, MapPin, AlertCircle } from 'lucide-react';

interface EmergencyTeamDashboardProps {
  incidents: Incident[];
  onBack: () => void;
}

const EmergencyTeamDashboard: React.FC<EmergencyTeamDashboardProps> = ({ incidents, onBack }) => {
  const activeAlerts = incidents.filter(i => i.status === 'pending');

  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-10 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-sm border border-slate-800 transition-all"
          >
            <ArrowLeft className="text-slate-400" size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black">Emergency Response Panel</h1>
            <p className="text-slate-500">24/7 Monitoring Active • Multi-channel Alerts</p>
          </div>
        </div>

        {/* Critical Alerts Zone */}
        <div className="grid grid-cols-1 gap-6">
          {activeAlerts.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-16 text-center text-slate-500">
               <ShieldAlert size={64} className="mx-auto mb-4 opacity-20" />
               <p className="text-xl font-medium">No critical incidents reported at this time.</p>
            </div>
          ) : (
            activeAlerts.map(alert => (
              <div key={alert.id} className="bg-rose-950/30 border border-rose-500/50 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center animate-pulse">
                <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center shrink-0">
                  <AlertCircle size={40} className="text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-black text-rose-100">{alert.residentName}</h2>
                    <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase">CRITICAL</span>
                  </div>
                  <p className="text-rose-200/70 text-lg">{alert.details}</p>
                  <div className="flex gap-6 mt-4">
                     <div className="flex items-center gap-2 text-rose-300">
                       <MapPin size={18} />
                       <span className="font-bold">Zone A - Floor 2</span>
                     </div>
                     <div className="flex items-center gap-2 text-rose-300">
                       <ShieldAlert size={18} />
                       <span className="font-bold">Priority: Level 1</span>
                     </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                   <button className="px-8 py-4 bg-rose-500 hover:bg-rose-600 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-3">
                     <Phone size={20} /> DISPATCH TEAM
                   </button>
                   <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold text-slate-300 transition-all">
                     VIEW VITALS
                   </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Historical Logs Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8">
           <h3 className="text-xl font-bold mb-6">Recent Escalation Logs</h3>
           <div className="space-y-4">
              {incidents.slice(1, 5).map(inc => (
                <div key={inc.id} className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800/50">
                   <div>
                     <div className="font-bold text-slate-200">{inc.residentName}</div>
                     <div className="text-xs text-slate-500">{inc.type.toUpperCase()} • Handled by Staff</div>
                   </div>
                   <div className="text-sm font-medium text-slate-600">
                     {inc.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyTeamDashboard;
