import React from 'react';
import { Settings, Users } from 'lucide-react';
import Button from '../../atoms/Button/Button';
import { useSelector } from 'react-redux';

const Header = ({ onOpenSettings }) => {
  const connectedClients = useSelector(state => state.bluetooth.connectedDevices.length);
  const maxClients = useSelector(state => state.user.settings.maxClients);

  return (
    <header className="bg-slate-800 p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Button
          variant="ghost"
          icon={<Settings className="w-6 h-6" />}
          onClick={onOpenSettings}
          aria-label="Einstellungen öffnen"
        />
        
        <h1 className="text-xl font-bold text-gray-200">
          TacticShot
        </h1>
        
        <div className="flex items-center gap-2 text-gray-200">
          <Users className="w-5 h-5" />
          <span>{connectedClients} von {maxClients} Teilnehmer</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
