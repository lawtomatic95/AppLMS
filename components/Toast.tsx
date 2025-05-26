
import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onClose after the fade-out animation completes
      setTimeout(onClose, 300); 
    }, 2700); // Start fading out a bit before 3s

    return () => clearTimeout(timer);
  }, [onClose]);
  
  const baseClasses = "fixed top-5 right-5 p-4 rounded-lg shadow-xl text-white text-sm font-medium z-[200] transition-all duration-300 ease-in-out";
  const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const visibilityClasses = isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full';

  return (
    <div className={`${baseClasses} ${typeClasses} ${visibilityClasses}`}>
      {message}
    </div>
  );
};

export default Toast;
    