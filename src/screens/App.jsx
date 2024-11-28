import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/state/redux/store';
import HomeScreen from './screens/Home/HomeScreen';
import ModesScreen from './screens/Modes/ModesScreen';
import TrainingScreen from './screens/Training/TrainingScreen';
import BluetoothManager from './features/Bluetooth/BluetoothManager';
import { loadSettings } from './app/state/redux/slices/userSlice';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSettings, setShowSettings] = useState(false);

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load user settings
        await store.dispatch(loadSettings());
        
        // Initialize Bluetooth
        await BluetoothManager.initialize();
        
      } catch (error) {
        console.error('App initialization failed:', error);
      }
    };

    initializeApp();
  }, []);

  // Render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'modes':
        return (
          <ModesScreen 
            onOpenSettings={() => setShowSettings(true)} 
          />
        );
      case 'training':
        return (
          <TrainingScreen 
            onOpenSettings={() => setShowSettings(true)} 
          />
        );
      default:
        return (
          <HomeScreen 
            onOpenSettings={() => setShowSettings(true)} 
          />
        );
    }
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-900">
        {renderContent()}

        {/* Settings Modal */}
        {showSettings && (
          <SettingsModal 
            onClose={() => setShowSettings(false)} 
          />
        )}
      </div>
    </Provider>
  );
};

// Settings Modal Component
const SettingsModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.user.settings);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSave = () => {
    dispatch(updateSettings(tempSettings));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-200">Einstellungen</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Sprache
            </label>
            <Select
              value={tempSettings.language}
              onChange={(e) => setTempSettings({
                ...tempSettings,
                language: e.target.value
              })}
              options={[
                { value: 'de', label: 'Deutsch' },
                { value: 'en', label: 'English' },
                { value: 'fr', label: 'Français' }
              ]}
            />
          </div>

          {/* Max Clients */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Maximale Teilnehmer
            </label>
            <Input
              type="number"
              value={tempSettings.maxClients}
              onChange={(e) => setTempSettings({
                ...tempSettings,
                maxClients: parseInt(e.target.value)
              })}
              min={1}
              max={50}
            />
          </div>

          {/* Sound Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Sound
            </label>
            <ToggleGroup
              value={tempSettings.soundEnabled ? 'on' : 'off'}
              onChange={(value) => setTempSettings({
                ...tempSettings,
                soundEnabled: value === 'on'
              })}
              options={[
                { value: 'on', label: 'An' },
                { value: 'off', label: 'Aus' }
              ]}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              fullWidth
            >
              Abbrechen
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              fullWidth
            >
              Speichern
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
