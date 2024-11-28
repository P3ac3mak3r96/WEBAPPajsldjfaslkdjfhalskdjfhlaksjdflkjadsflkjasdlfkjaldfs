import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BaseTemplate from '../../components/templates/BaseTemplate/BaseTemplate';
import Card from '../../components/atoms/Card/Card';
import Button from '../../components/atoms/Button/Button';
import { Activity, Pause, Play, Stop } from 'lucide-react';

const TrainingScreen = ({ onOpenSettings }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const activeMode = useSelector(state => state.modes.activeMode);
  const connectedDevices = useSelector(state => state.bluetooth.connectedDevices);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setDuration(duration => duration + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setDuration(0);
  };

  return (
    <BaseTemplate onOpenSettings={onOpenSettings}>
      <div className="space-y-6">
        {/* Status Card */}
        <Card>
          <div className="p-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-200 mb-2">
                {activeMode ? activeMode.name : 'Kein aktives Training'}
              </h2>
              <p className="text-gray-400 mb-6">
                {connectedDevices.length} Teilnehmer verbunden
              </p>
              <div className="text-5xl font-mono text-amber-500 mb-8">
                {formatTime(duration)}
              </div>
              
              <div className="flex justify-center gap-4">
                {!isActive ? (
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Play className="w-6 h-6" />}
                    onClick={handleStart}
                  >
                    Start
                  </Button>
                ) : (
                  <>
                    <Button
                      variant={isPaused ? 'primary' : 'secondary'}
                      size="lg"
                      icon={isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                      onClick={handlePause}
                    >
                      {isPaused ? 'Fortsetzen' : 'Pause'}
                    </Button>
                    <Button
                      variant="danger"
                      size="lg"
                      icon={<Stop className="w-6 h-6" />}
                      onClick={handleStop}
                    >
                      Beenden
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        {isActive && (
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-200 mb-4">Statistiken</h3>
              {/* Hier kommen die Trainingsstatistiken */}
            </div>
          </Card>
        )}
      </div>
    </BaseTemplate>
  );
};

export default TrainingScreen;
