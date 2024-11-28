import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DeviceCard from '../../molecules/DeviceCard/DeviceCard';
import SearchField from '../../molecules/SearchField/SearchField';
import Button from '../../atoms/Button/Button';
import { Scan } from 'lucide-react';

const DeviceList = ({ 
  onConnect,
  onDisconnect,
  onConfigure,
  onStartScan,
  isScanning 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const devices = useSelector(state => state.bluetooth.availableDevices);
  
  const filteredDevices = devices.filter(device => 
    device.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <SearchField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Gerät suchen..."
          className="flex-1"
        />
        <Button
          variant="primary"
          icon={<Scan className="w-5 h-5" />}
          loading={isScanning}
          onClick={onStartScan}
        >
          {isScanning ? 'Suche...' : 'Scan starten'}
        </Button>
      </div>

      <div className="space-y-3">
        {filteredDevices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            onConfigure={onConfigure}
          />
        ))}

        {filteredDevices.length === 0 && !isScanning && (
          <div className="text-center py-8 text-gray-400">
            {searchQuery
              ? 'Keine Geräte gefunden'
              : 'Starten Sie einen Scan um Geräte zu finden'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceList;
