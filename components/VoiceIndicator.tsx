
import React from 'react';

interface VoiceIndicatorProps {
  isListening: boolean;
  isThinking: boolean;
}

const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({ isListening, isThinking }) => {
  return (
    <div className="flex items-center justify-center space-x-2 h-12">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`
            w-1.5 rounded-full transition-all duration-300
            ${isListening ? 'bg-indigo-500 ai-pulse' : 'bg-slate-300'}
            ${isThinking ? 'bg-amber-400' : ''}
          `}
          style={{
            height: isListening ? `${20 + Math.random() * 30}px` : '8px',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default VoiceIndicator;
