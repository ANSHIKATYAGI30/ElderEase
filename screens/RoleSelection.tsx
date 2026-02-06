
import React from 'react';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  const roles = [
    {
      id: 'ELDERLY' as UserRole,
      title: 'Resident',
      desc: 'Elderly care & safety features',
      icon: '🏠',
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    },
    {
      id: 'CAREGIVER' as UserRole,
      title: 'Caregiver',
      desc: 'Staff & monitoring tools',
      icon: '👨‍⚕️',
      color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    },
    {
      id: 'EMERGENCY' as UserRole,
      title: 'Emergency Team',
      desc: 'Critical response unit',
      icon: '🚨',
      color: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span className="text-white text-3xl font-bold">EE</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">ElderEase</h1>
        <p className="text-slate-500 italic">"Technology should not just be smart. It should be kind."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={`
              p-8 rounded-3xl transition-all duration-300 text-left border border-transparent
              flex flex-col items-center text-center shadow-sm hover:shadow-md
              ${role.color}
            `}
          >
            <span className="text-5xl mb-4">{role.icon}</span>
            <h3 className="text-xl font-bold mb-2">{role.title}</h3>
            <p className="text-sm opacity-80">{role.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
