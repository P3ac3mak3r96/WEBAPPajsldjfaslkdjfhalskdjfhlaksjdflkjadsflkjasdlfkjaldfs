import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';
import InputField from '../../molecules/InputField/InputField';
import ColorPicker from '../../molecules/ColorPicker/ColorPicker';
import DeviceList from '../DeviceList/DeviceList';
import {
  updateGroup,
  deleteGroup,
  addClientToGroup,
  removeClientFromGroup
} from '../../../app/state/redux/slices/modesSlice';

const GroupEditor = ({ group, onSave }) => {
  const dispatch = useDispatch();
  const connectedDevices = useSelector(state => state.bluetooth.connectedDevices);

  const handleSettingsChange = (key, value) => {
    dispatch(updateGroup({
      groupId: group.id,
      settings: {
        ...group.settings,
        [key]: value
      }
    }));
  };

  return (
    <Card>
      <div className="space-y-6">
        {/* Gruppen Basis-Einstellungen */}
        <div className="space-y-4">
          <InputField
            label="Gruppenname"
            value={group.name}
            onChange={(e) => handleSettingsChange('name', e.target.value)}
          />

          <ColorPicker
            label="LED-Farbe"
            value={group.settings.color}
            onChange={(color) => handleSettingsChange('color', color)}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Min. Intervall (ms)"
              type="number"
              value={group.settings.minInterval}
              onChange={(e) => handleSettingsChange('minInterval', parseInt(e.target.value))}
              min={100}
              step={100}
            />

            <InputField
              label="Max. Intervall (ms)"
              type="number"
              value={group.settings.maxInterval}
              onChange={(e) => handleSettingsChange('maxInterval', parseInt(e.target.value))}
              min={group.settings.minInterval}
              step={100}
            />
          </div>
        </div>

        {/* Geräte-Zuweisung */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-200">Zugewiesene Geräte</h3>
          
          <div className="space-y-2">
            {group.clients.map(clientId => {
              const device = connectedDevices.find(d => d.id === clientId);
              if (!device) return null;

              return (
                <div key={clientId} className="flex items-center justify-between p-2 bg-slate-700 rounded">
                  <span className="text-gray-200">{device.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => dispatch(removeClientFromGroup({ groupId: group.id, clientId }))}
                  />
                </div>
              );
            })}
          </div>

          {/* Verfügbare Geräte */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Verfügbare Geräte</h4>
            {connectedDevices
              .filter(device => !group.clients.includes(device.id))
              .map(device => (
                <button
                  key={device.id}
                  onClick={() => dispatch(addClientToGroup({ groupId: group.id, clientId: device.id }))}
                  className="w-full text-left p-2 hover:bg-slate-700 rounded flex items-center justify-between"
                >
                  <span className="text-gray-200">{device.name}</span>
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              ))}
          </div>
        </div>

        {/* Aktionen */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="danger"
            onClick={() => dispatch(deleteGroup(group.id))}
          >
            Gruppe löschen
          </Button>
          <Button
            variant="primary"
            onClick={onSave}
          >
            Speichern
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GroupEditor;
