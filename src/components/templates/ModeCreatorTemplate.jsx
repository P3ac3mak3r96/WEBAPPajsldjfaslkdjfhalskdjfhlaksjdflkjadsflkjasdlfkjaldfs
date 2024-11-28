import React, { useState } from 'react';
import { ChevronLeft, Save } from 'lucide-react';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';
import GroupEditor from '../../organisms/GroupEditor/GroupEditor';
import DeviceList from '../../organisms/DeviceList/DeviceList';

const ModeCreatorTemplate = ({
  mode,
  onSave,
  onBack,
  isEditing = false
}) => {
  const [currentStep, setCurrentStep] = useState('groups'); // 'groups' | 'devices' | 'preview'
  const [selectedGroup, setSelectedGroup] = useState(null);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'groups':
        return (
          <div className="space-y-6">
            {selectedGroup ? (
              <GroupEditor
                group={selectedGroup}
                onSave={() => setSelectedGroup(null)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mode.groups.map(group => (
                  <Card
                    key={group.id}
                    className="cursor-pointer hover:border-amber-500 transition-colors"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <div className="p-4">
                      <h3 className="font-medium text-gray-200">{group.name}</h3>
                      <p className="text-sm text-gray-400">
                        {group.clients.length} Geräte zugewiesen
                      </p>
                    </div>
                  </Card>
                ))}

                <Button
                  variant="ghost"
                  className="h-32 border-2 border-dashed border-gray-700 hover:border-amber-500"
                  onClick={() => {/* Create new group */}}
                >
                  Neue Gruppe erstellen
                </Button>
              </div>
            )}
          </div>
        );

      case 'devices':
        return (
          <DeviceList
            onConnect={() => {}}
            onDisconnect={() => {}}
            onConfigure={() => {}}
          />
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-200">Vorschau</h2>
            {/* Preview implementation */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            icon={<ChevronLeft className="w-5 h-5" />}
            onClick={onBack}
          >
            Zurück
          </Button>
          <h1 className="text-2xl font-bold text-gray-200">
            {isEditing ? 'Modus bearbeiten' : 'Neuer Modus'}
          </h1>
        </div>

        <Button
          variant="primary"
          icon={<Save className="w-5 h-5" />}
          onClick={onSave}
        >
          Speichern
        </Button>
      </div>

      {/* Steps */}
      <div className="flex border-b border-gray-700">
        {[
          { id: 'groups', label: 'Gruppen' },
          { id: 'devices', label: 'Geräte' },
          { id: 'preview', label: 'Vorschau' }
        ].map(step => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors
              ${currentStep === step.id
                ? 'border-amber-500 text-amber-500'
                : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ModeCreatorTemplate;
