
export type UserRole = 'ELDERLY' | 'CAREGIVER' | 'EMERGENCY';

export type LanguageCode = 'en' | 'hi' | 'bn' | 'mr' | 'ml';

export interface Language {
  code: LanguageCode;
  label: string;
  native: string;
}

export interface Resident {
  id: string;
  name: string;
  age: number;
  room: string;
  lastActivity: string;
  medicalHistory: string[];
  status: 'active' | 'sleeping' | 'emergency' | 'away';
  language: LanguageCode;
}

export interface Incident {
  id: string;
  residentId: string;
  residentName: string;
  type: 'fall' | 'sos' | 'medical';
  timestamp: Date;
  status: 'pending' | 'resolved' | 'escalated';
  details: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'नमस्ते' },
  { code: 'bn', label: 'Bengali', native: 'নমস্কার' },
  { code: 'mr', label: 'Marathi', native: 'नमस्कार' },
  { code: 'ml', label: 'Malayalam', native: 'നമസ്കാരം' }
];

export const MOCK_RESIDENTS: Resident[] = [
  {
    id: '1',
    name: 'Mrs. Shanthi Sharma',
    age: 72,
    room: 'A-201',
    lastActivity: '2 mins ago',
    medicalHistory: ['Hypertension', 'Diabetes Type 2', 'Previous Hip Surgery'],
    status: 'active',
    language: 'hi'
  },
  {
    id: '2',
    name: 'Mr. Animesh Ray',
    age: 80,
    room: 'B-104',
    lastActivity: '15 mins ago',
    medicalHistory: ['Heart Condition', 'Mild Arthritis'],
    status: 'sleeping',
    language: 'bn'
  },
  {
    id: '3',
    name: 'Mrs. Kavita Deshpande',
    age: 68,
    room: 'C-302',
    lastActivity: '1 hour ago',
    medicalHistory: ['Osteoporosis'],
    status: 'active',
    language: 'mr'
  }
];
