import React from 'react';
import { Plus, Folder } from 'lucide-react';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';

const ModeListingTemplate = ({
  modes,
  customModes,
  onCreateMode,
  onSelectMode,
  onOpenSavedModes
}) => {
  return (
    <div className="space-y-8">
      {/* Standard Modi */}
      <section>
        <h2 className="text-xl font-bold text-gray-200 mb-4">Trainingsmodi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modes.map(mode => (
            <Card
              key={mode.id}
              className={`${mode.color} cursor-pointer transform transition-all 
                         hover:scale-105 hover:brightness-110`}
              onClick={() => onSelectMode(mode)}
            >
              <div className="p-6 text-center">
                <mode.icon className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white">
                  {mode.name}
                </h3>
                <p className="text-sm text-white/80 mt-2">
                  {mode.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Aktionen */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="lg"
            icon={<Plus className="w-6 h-6" />}
            onClick={onCreateMode}
            className="h-24"
          >
            <div className="text-left">
              <div className="font-semibold">Neuer Modus</div>
              <div className="text-sm opacity-80">
                Erstellen Sie einen eigenen Trainingsmodus
              </div>
            </div>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={<Folder className="w-6 h-6" />}
            onClick={onOpenSavedModes}
            className="h-24"
          >
            <div className="text-left">
              <div className="font-semibold">Gespeicherte Modi</div>
              <div className="text-sm opacity-80">
                {customModes.length} eigene Modi verfügbar
              </div>
            </div>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ModeListingTemplate;
