
import React, { useState } from 'react';
import { Resident, LanguageCode } from '../types';
import { translations } from '../translations';
import { Mic, AlertTriangle, User, History, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import VoiceIndicator from '../components/VoiceIndicator';
import { getAIResponse } from '../geminiService';

interface ElderDashboardProps {
  resident: Resident;
  onSOS: () => void;
  onFallSimulate: () => void;
  onLanguageChange: (code: LanguageCode) => void;
  onBack: () => void;
}

const ElderDashboard: React.FC<ElderDashboardProps> = ({ resident, onSOS, onFallSimulate, onLanguageChange, onBack }) => {
  const t = translations[resident.language];
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setIsLoading(true);
    setAiResponse("");
    const result = await getAIResponse(resident, userInput, resident.language);
    setAiResponse(result);
    setUserInput("");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen elder-gradient-blue p-4 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white/50 hover:bg-white rounded-2xl shadow-sm transition-all border border-slate-200/50"
            aria-label="Go Back"
          >
            <ArrowLeft className="text-slate-600" size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {t.welcome} {resident.name.split(' ')[1]}
            </h1>
            <p className="text-slate-500">How are you feeling today?</p>
          </div>
        </div>
        <LanguageSwitcher current={resident.language} onChange={onLanguageChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Main Interaction Side */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Quick Stats Card */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 border border-slate-100">
            <div className="w-40 h-40 rounded-full bg-slate-50 flex items-center justify-center border-8 border-indigo-50">
              <img src={`https://picsum.photos/seed/${resident.id}/200`} className="rounded-full w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium text-slate-600">Active Monitoring</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{resident.room}</h2>
              <div className="flex gap-3 justify-center md:justify-start">
                {['Woke up', 'Took BP', 'Light Walk'].map((act) => (
                  <span key={act} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                    {act}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SOS & Voice Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SOS Button */}
            <button
              onClick={onSOS}
              className="bg-indigo-600 h-64 rounded-[2.5rem] flex flex-col items-center justify-center text-white shadow-xl hover:bg-indigo-700 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors" />
              <AlertTriangle size={64} className="mb-4" />
              <span className="text-2xl font-bold">{t.sos}</span>
              <p className="mt-2 text-indigo-100 opacity-80">{t.help}</p>
            </button>

            {/* AI Companion Preview */}
            <div className="bg-gradient-to-br from-[#FFD54F] to-[#FFF3C4] h-64 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm border border-amber-200">
              <div className="flex justify-between items-start">
                <div className="bg-white/40 p-3 rounded-2xl">
                  <Mic className="text-amber-800" />
                </div>
                <button 
                  onClick={() => setIsAIOpen(!isAIOpen)}
                  className="bg-white/40 px-4 py-2 rounded-xl text-amber-900 text-sm font-bold"
                >
                  {isAIOpen ? 'CLOSE' : 'OPEN'}
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900">{t.talkToMe}</h3>
                <p className="text-amber-800/80">I'm here to listen, {resident.name.split(' ')[1]}.</p>
              </div>
            </div>
          </div>

          {/* AI Chat Interface */}
          {isAIOpen && (
            <div className="bg-white rounded-[2.5rem] p-8 shadow-md border border-slate-100 animate-in slide-in-from-bottom-4 duration-300">
              <div className="mb-6 h-32 overflow-y-auto bg-slate-50 rounded-2xl p-4">
                {isLoading ? (
                  <VoiceIndicator isListening={false} isThinking={true} />
                ) : aiResponse ? (
                  <p className="text-lg text-slate-700 italic">"{aiResponse}"</p>
                ) : (
                  <p className="text-slate-400">Ask me anything... maybe about the weather or just to say hello.</p>
                )}
              </div>
              <form onSubmit={handleAISubmit} className="flex gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type or speak to Ease..."
                  className="flex-1 bg-slate-100 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <ChevronRight size={24} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Info Side */}
        <div className="flex flex-col gap-6">
          {/* Medical Snapshot */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <History className="text-indigo-600" />
              <h3 className="text-xl font-bold text-slate-800">{t.medicalSnapshot}</h3>
            </div>
            <div className="space-y-4">
              {resident.medicalHistory.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Checklist */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-emerald-500" />
              <h3 className="text-xl font-bold text-slate-800">{t.lastCheckin}</h3>
            </div>
            <div className="space-y-4">
              {[t.wokeUp, t.ateMeal, t.tookMedicine].map((task, idx) => (
                <button 
                  key={idx}
                  className="w-full flex items-center justify-between p-5 bg-emerald-50 rounded-2xl text-emerald-900 font-bold hover:bg-emerald-100 transition-colors"
                >
                  <span>{task}</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dev Simulate Fall */}
          <button 
            onClick={onFallSimulate}
            className="p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 font-medium hover:bg-rose-100 transition-colors"
          >
            [Dev] Simulate Fall Detection
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElderDashboard;
