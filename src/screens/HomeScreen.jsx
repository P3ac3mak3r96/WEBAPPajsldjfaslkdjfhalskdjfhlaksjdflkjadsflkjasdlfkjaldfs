import React from 'react';
import { useSelector } from 'react-redux';
import { Activity } from 'lucide-react';
import BaseTemplate from '../../components/templates/BaseTemplate/BaseTemplate';
import Card from '../../components/atoms/Card/Card';
import Button from '../../components/atoms/Button/Button';

const HomeScreen = ({ onOpenSettings }) => {
  const lastSessions = useSelector(state => state.user.lastTrainingSessions);
  
  return (
    <BaseTemplate onOpenSettings={onOpenSettings}>
      <div className="space-y-6">
        {/* Schnellstart */}
        <Card className="bg-slate-800">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-200 mb-4">Schnellstart</h2>
            <Button
              variant="primary"
              icon={<Activity className="w-5 h-5" />}
              fullWidth
              size="lg"
            >
              Training starten
            </Button>
          </div>
        </Card>

        {/* Letzte Trainings */}
        <Card className="bg-slate-800">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-200 mb-4">
              Letzte Trainings
            </h2>
            <div className="space-y-4">
              {lastSessions.length > 0 ? (
                lastSessions.map((session) => (
                  <div
                    key={session.id}
                    className="border-b border-gray-700 pb-4 last:border-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <span className="font-medium text-gray-200">
                          {session.modeName}
                        </span>
                        <div className="text-sm text-gray-400">
                          {session.participants} Teilnehmer • {session.duration} Min
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {session.dateFormatted}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  Keine Trainings vorhanden
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </BaseTemplate>
  );
};

export default HomeScreen;
