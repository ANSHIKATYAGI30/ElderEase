
import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Resident, LanguageCode } from '../types';
import { AlertCircle, ShieldAlert, PhoneCall } from 'lucide-react';

interface EmergencyAlertProps {
  type: 'fall' | 'sos';
  resident: Resident;
  onCancel: () => void;
  onConfirm: () => void;
  onEscalate: () => void;
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ type, resident, onCancel, onConfirm, onEscalate }) => {
  const t = translations[resident.language];
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onEscalate();
    }
  }, [countdown, onEscalate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className={`p-10 text-center ${type === 'fall' ? 'bg-rose-600' : 'bg-indigo-600'} text-white`}>
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 ai-pulse">
            {type === 'fall' ? <AlertCircle size={48} /> : <ShieldAlert size={48} />}
          </div>
          <h1 className="text-4xl font-black mb-2">
            {type === 'fall' ? t.fallDetected : t.sos}
          </h1>
          <p className="text-xl opacity-90">{t.areYouOkay}</p>
        </div>

        <div className="p-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-7xl font-black text-slate-800 tabular-nums">{countdown}</div>
            <p className="text-slate-500 font-bold uppercase tracking-widest">{t.seconds} {t.callingCaregiver}</p>
            
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${type === 'fall' ? 'bg-rose-600' : 'bg-indigo-600'}`}
                style={{ width: `${(countdown / 20) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={onConfirm}
              className={`w-full py-6 rounded-3xl text-2xl font-black shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3 ${
                type === 'fall' ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'
              }`}
            >
              <PhoneCall size={28} />
              {t.needHelp}
            </button>
            
            <button
              onClick={onCancel}
              className="w-full py-6 rounded-3xl text-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
            >
              {t.imFine}
            </button>
          </div>
        </div>

        <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex items-center gap-4">
           <img src={`https://picsum.photos/seed/${resident.id}/100`} className="w-12 h-12 rounded-full" alt="" />
           <div>
              <div className="font-bold text-slate-800">{resident.name}</div>
              <div className="text-xs text-slate-500">{resident.medicalHistory[0]} • Room {resident.room}</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;
