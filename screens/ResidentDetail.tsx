
import React from 'react';
import { Resident } from '../types';
import { ArrowLeft, User, Heart, Shield, Activity, Calendar } from 'lucide-react';

interface ResidentDetailProps {
  resident: Resident;
  onBack: () => void;
}

const ResidentDetail: React.FC<ResidentDetailProps> = ({ resident, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white hover:bg-slate-50 rounded-2xl shadow-sm border border-slate-200 transition-all"
          >
            <ArrowLeft className="text-slate-600" size={24} />
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Resident Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10">
          <div className="w-48 h-48 rounded-[2rem] overflow-hidden bg-slate-100 shrink-0">
            <img src={`https://picsum.photos/seed/${resident.id}/400`} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black text-slate-900">{resident.name}</h2>
                <p className="text-slate-500 text-lg">Room {resident.room} • {resident.age} years old</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${
                resident.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {resident.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                <Heart className="text-rose-500" />
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Language Pref</div>
                  <div className="font-bold text-slate-700">{resident.language.toUpperCase()}</div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                <Activity className="text-indigo-500" />
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Last Activity</div>
                  <div className="font-bold text-slate-700">{resident.lastActivity}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Shield className="text-indigo-600" /> Medical Snapshot
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resident.medicalHistory.map((item, idx) => (
              <div key={idx} className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                <span className="font-bold text-indigo-900">{item}</span>
                <Calendar size={18} className="text-indigo-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Routine Logs</h3>
          <div className="space-y-4">
             {[
               { time: '08:15 AM', action: 'Breakfast completed' },
               { time: '09:30 AM', action: 'Morning medication administered' },
               { time: '11:00 AM', action: 'Gentle mobility exercise' }
             ].map((log, idx) => (
               <div key={idx} className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                 <div className="text-slate-400 font-medium whitespace-nowrap">{log.time}</div>
                 <div className="w-px bg-slate-100" />
                 <div className="text-slate-700 font-medium">{log.action}</div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetail;
