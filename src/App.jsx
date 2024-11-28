import React from 'react';
import { Settings, Activity, Home, Users } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 p-4">
        <div className="flex justify-between items-center">
          <button className="text-gray-200">
            <Settings className="w-6 h-6" />
          </button>
          
          <h1 className="text-gray-200 text-xl font-bold">TacticShot</h1>
          
          <div className="flex items-center gap-2 text-gray-200">
            <Users className="w-5 h-5" />
            <span>3 von 10 Teilnehmer</span>
          </div>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="p-4">
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-200 mb-4">Schnellstart</h2>
          <button className="w-full bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-lg flex items-center justify-center gap-2">
            <Activity className="w-5 h-5" />
            Training starten
          </button>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-gray-700">
        <div className="flex justify-around p-4">
          <button className="flex flex-col items-center text-amber-500">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Activity className="w-6 h-6" />
            <span className="text-xs mt-1">Modi</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Activity className="w-6 h-6" />
            <span className="text-xs mt-1">Training</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;