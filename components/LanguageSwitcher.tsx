
import React from 'react';
import { LANGUAGES, LanguageCode } from '../types';

interface LanguageSwitcherProps {
  current: LanguageCode;
  onChange: (code: LanguageCode) => void;
  variant?: 'large' | 'small';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ current, onChange, variant = 'small' }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={`
            px-4 py-2 rounded-full transition-all duration-300 font-medium
            ${current === lang.code 
              ? 'bg-indigo-600 text-white shadow-lg' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'}
            ${variant === 'large' ? 'text-lg px-6 py-3' : 'text-sm'}
          `}
        >
          {lang.native}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
