import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BaseTemplate from '../../components/templates/BaseTemplate/BaseTemplate';
import ModeListingTemplate from '../../components/templates/ModeListingTemplate/ModeListingTemplate';
import ModeCreatorTemplate from '../../components/templates/ModeCreatorTemplate/ModeCreatorTemplate';
import { addCustomMode } from '../../app/state/redux/slices/modesSlice';

const ModesScreen = ({ onOpenSettings }) => {
  const [showCreator, setShowCreator] = useState(false);
  const dispatch = useDispatch();
  const customModes = useSelector(state => state.modes.customModes);

  const baseTrainingModes = [
    {
      id: 'reaction',
      name: 'Schnellfeuer',
      description: 'Reaktionsschnelles Schießtraining',
      color: 'bg-amber-600'
    },
    {
      id: 'precision',
      name: 'Präzision',
      description: 'Präzisionsschießen auf Zeit',
      color: 'bg-green-600'
    },
    {
      id: 'tactical',
      name: 'Taktisch',
      description: 'Taktische Schießabläufe',
      color: 'bg-slate-600'
    }
  ];

  const handleSaveMode = (mode) => {
    dispatch(addCustomMode(mode));
    setShowCreator(false);
  };

  return (
    <BaseTemplate onOpenSettings={onOpenSettings}>
      {showCreator ? (
        <ModeCreatorTemplate
          onSave={handleSaveMode}
          onBack={() => setShowCreator(false)}
        />
      ) : (
        <ModeListingTemplate
          modes={baseTrainingModes}
          customModes={customModes}
          onCreateMode={() => setShowCreator(true)}
          onSelectMode={(mode) => {
            // Implementierung für Modus-Auswahl
          }}
        />
      )}
    </BaseTemplate>
  );
};

export default ModesScreen;
