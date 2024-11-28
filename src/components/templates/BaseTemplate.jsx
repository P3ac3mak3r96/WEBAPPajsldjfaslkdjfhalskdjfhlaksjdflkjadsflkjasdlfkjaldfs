import React from 'react';
import Header from '../../organisms/Header/Header';
import Navigation from '../../organisms/Navigation/Navigation';

const BaseTemplate = ({ 
  children,
  onOpenSettings,
  hideNavigation = false
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header onOpenSettings={onOpenSettings} />
      
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {!hideNavigation && <Navigation />}
    </div>
  );
};

export default BaseTemplate;
