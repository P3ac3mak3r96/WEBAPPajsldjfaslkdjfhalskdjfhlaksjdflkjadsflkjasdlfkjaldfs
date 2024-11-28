import React from 'react';
import { Home, Activity } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../app/state/redux/slices/navigationSlice';

const Navigation = () => {
  const currentPage = useSelector(state => state.navigation.currentPage);
  const dispatch = useDispatch();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'modes', icon: Activity, label: 'Modi' },
    { id: 'training', icon: Activity, label: 'Training' }
  ];

  return (
    <nav className="bg-slate-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around p-4">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => dispatch(setCurrentPage(item.id))}
                className={`flex flex-col items-center transition-colors duration-200
                  ${currentPage === item.id ? 'text-amber-500' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
