import React from 'react';
import { Wifi, WifiOff, Settings } from 'lucide-react';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';

const DeviceCard = ({
  device,
  onConnect,
  onDisconnect,
  onConfigure,
  className = ''
}) => {
  const isConnected = device.status === 'connected';

  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isConnected ? (
            <Wifi className="w-5 h-5 text-green-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-gray-400" />
          )}
          
          <div>
            <h3 className="font-medium text-gray-200">
              {device.name || 'Unbekanntes Gerät'}
            </h3>
            <p className="text-sm text-gray-400">
              ID: {device.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                icon={<Settings className="w-4 h-4" />}
                onClick={() => onConfigure(device)}
              >
                Konfigurieren
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDisconnect(device)}
              >
                Trennen
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onConnect(device)}
            >
              Verbinden
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DeviceCard;
