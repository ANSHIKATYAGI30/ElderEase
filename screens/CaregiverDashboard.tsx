
import React from 'react';
import { MOCK_RESIDENTS, Resident, Incident } from '../types';
import { Users, Activity, AlertCircle, Bell, Clock, MapPin, ArrowLeft } from 'lucide-react';

interface CaregiverDashboardProps {
  onResidentSelect: (resident: Resident) => void;
  incidents: Incident[];
  onBack: () => void;
}

const CaregiverDashboard: React.FC<CaregiverDashboardProps> = ({ onResidentSelect, incidents, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 bg-white hover:bg-slate-50 rounded-2xl shadow-sm border border-slate-200 transition-all"
              aria-label="Go Back"
            >
              <ArrowLeft className="text-slate-600" size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Facility Overview</h1>
              <p className="text-slate-500">Managing 12 Active Residents • 3 Support Staff Online</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
            <div className="px-5 py-3 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
              <img src="https://picsum.photos/seed/caregiver/100" className="w-8 h-8 rounded-full" alt="User" />
              <span className="font-bold text-slate-700">Staff Dr. Mehta</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Users /></div>
              <h3 className="font-bold text-slate-800">Total Residents</h3>
            </div>
            <p className="text-4xl font-black text-slate-900">42</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Activity /></div>
              <h3 className="font-bold text-slate-800">Active Monitoring</h3>
            </div>
            <p className="text-4xl font-black text-slate-900">38</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><AlertCircle /></div>
              <h3 className="font-bold text-slate-800">Incidents (24h)</h3>
            </div>
            <p className="text-4xl font-black text-slate-900">{incidents.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Alerts */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Bell className="text-rose-500" size={20} /> Recent Alerts
            </h2>
            <div className="space-y-4">
              {incidents.length === 0 ? (
                <div className="p-10 bg-white rounded-[2rem] border border-slate-100 text-center text-slate-400">
                  No active incidents
                </div>
              ) : (
                incidents.map((incident) => (
                  <div key={incident.id} className={`p-6 rounded-[2rem] shadow-sm border animate-pulse ${
                    incident.type === 'fall' ? 'bg-rose-50 border-rose-100' : 'bg-amber-50 border-amber-100'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        incident.type === 'fall' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {incident.type} Detected
                      </span>
                      <span className="text-xs text-slate-500 font-medium">1m ago</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{incident.residentName}</h3>
                    <p className="text-sm text-slate-600 mb-4">{incident.details}</p>
                    <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50">
                      Take Action
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Resident List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Resident Directory</h2>
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-6 py-4 text-slate-500 font-semibold text-sm">Resident</th>
                      <th className="px-6 py-4 text-slate-500 font-semibold text-sm">Location</th>
                      <th className="px-6 py-4 text-slate-500 font-semibold text-sm">Status</th>
                      <th className="px-6 py-4 text-slate-500 font-semibold text-sm">Last Seen</th>
                      <th className="px-6 py-4 text-slate-500 font-semibold text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_RESIDENTS.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <img src={`https://picsum.photos/seed/${res.id}/100`} className="w-10 h-10 rounded-full" alt="" />
                            <div>
                              <div className="font-bold text-slate-800">{res.name}</div>
                              <div className="text-xs text-slate-500">{res.age} years old</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-600">
                            <MapPin size={14} />
                            <span>{res.room}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            res.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
                            res.status === 'sleeping' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {res.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-500 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            {res.lastActivity}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <button 
                            onClick={() => onResidentSelect(res)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
