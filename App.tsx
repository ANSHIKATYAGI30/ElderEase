
import React, { useState, useCallback } from 'react';
import { UserRole, Resident, MOCK_RESIDENTS, Incident, LanguageCode } from './types';
import RoleSelection from './screens/RoleSelection';
import ElderDashboard from './screens/ElderDashboard';
import CaregiverDashboard from './screens/CaregiverDashboard';
import EmergencyAlert from './screens/EmergencyAlert';
import ResidentDetail from './screens/ResidentDetail';
import EmergencyTeamDashboard from './screens/EmergencyTeamDashboard';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [currentResident, setCurrentResident] = useState<Resident>(MOCK_RESIDENTS[0]);
  const [viewingResident, setViewingResident] = useState<Resident | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [activeEmergency, setActiveEmergency] = useState<'fall' | 'sos' | null>(null);

  const handleLanguageChange = (code: LanguageCode) => {
    setCurrentResident(prev => ({ ...prev, language: code }));
  };

  const triggerEmergency = (type: 'fall' | 'sos') => {
    setActiveEmergency(type);
    
    // Auto-create incident after escalation or confirmed
    const newIncident: Incident = {
      id: Math.random().toString(36).substr(2, 9),
      residentId: currentResident.id,
      residentName: currentResident.name,
      type: type,
      timestamp: new Date(),
      status: 'pending',
      details: `${type === 'fall' ? 'Potential fall detected via sensors' : 'SOS manual trigger'} from Room ${currentResident.room}`
    };
    setIncidents(prev => [newIncident, ...prev]);
  };

  const resolveEmergency = () => {
    setActiveEmergency(null);
  };

  const escalateEmergency = useCallback(() => {
    // In a real app, this sends data to the emergency team board
    setActiveEmergency(null);
  }, []);

  const renderContent = () => {
    if (!role) {
      return <RoleSelection onSelect={setRole} />;
    }

    switch (role) {
      case 'ELDERLY':
        return (
          <ElderDashboard 
            resident={currentResident} 
            onSOS={() => triggerEmergency('sos')}
            onFallSimulate={() => triggerEmergency('fall')}
            onLanguageChange={handleLanguageChange}
            onBack={() => setRole(null)}
          />
        );
      case 'CAREGIVER':
        if (viewingResident) {
          return (
            <ResidentDetail 
              resident={viewingResident} 
              onBack={() => setViewingResident(null)} 
            />
          );
        }
        return (
          <CaregiverDashboard 
            incidents={incidents}
            onResidentSelect={(res) => setViewingResident(res)} 
            onBack={() => setRole(null)}
          />
        );
      case 'EMERGENCY':
        return (
          <EmergencyTeamDashboard 
            incidents={incidents} 
            onBack={() => setRole(null)} 
          />
        );
      default:
        return <RoleSelection onSelect={setRole} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {renderContent()}

      {/* Emergency Overlay */}
      {activeEmergency && (
        <EmergencyAlert 
          type={activeEmergency}
          resident={currentResident}
          onCancel={resolveEmergency}
          onConfirm={() => {
            resolveEmergency();
            alert("Support is on their way! Stay calm.");
          }}
          onEscalate={escalateEmergency}
        />
      )}
    </div>
  );
};

export default App;
