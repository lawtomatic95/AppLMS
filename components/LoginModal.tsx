
import React, { useState } from 'react';
import Modal from './Modal';
import { LockClosedIcon } from './icons/LockClosedIcon';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Admin Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-ios-blue sm:text-sm"
              required
              autoFocus
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-ios-blue text-white py-2.5 px-4 rounded-lg shadow-sm hover:bg-blue-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium"
        >
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
    