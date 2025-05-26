import React from 'react';
import { DevicePhoneMobileIcon } from './icons/DevicePhoneMobileIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';

interface HeaderProps {
  isLoggedIn: boolean;
  onAdminLoginClick: () => void; // New prop to handle admin login click
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onAdminLoginClick, onLogoutClick }) => {
  return (
    <header className="bg-ios-system-background shadow-sm sticky top-0 z-50">
      <div className={`container mx-auto px-4 py-4 flex items-center ${isLoggedIn ? 'justify-between' : 'justify-center'}`}>
        <div className="flex items-center transition-transform duration-300 hover:scale-105">
          <DevicePhoneMobileIcon className="h-8 w-8 text-ios-blue mr-2" />
          <h1 className="text-2xl font-semibold text-gray-800">La Manzanita Stock</h1>
        </div>
        <div>
          {!isLoggedIn && ( // Show Admin Login button if not logged in
            null
          )}
          {isLoggedIn && ( // Only show logout button if logged in
            <button
              onClick={onLogoutClick}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-150 text-sm font-medium flex items-center"
            >
              <LockClosedIcon className="w-4 h-4 mr-1.5 opacity-80" />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;