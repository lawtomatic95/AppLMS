
import React from 'react';
import { ItemCategory, DisplayCategory } from '../types';
import { AppleIcon } from './icons/AppleIcon';
import { AndroidIcon } from './icons/AndroidIcon';
import { ListBulletIcon } from './icons/ListBulletIcon';

interface CategorySwitcherProps {
  currentCategory: DisplayCategory;
  onCategoryChange: (category: DisplayCategory) => void;
}

const CategorySwitcher: React.FC<CategorySwitcherProps> = ({ currentCategory, onCategoryChange }) => {
  const categories = [
    { name: 'All' as DisplayCategory, icon: <ListBulletIcon className="w-5 h-5 mr-2" />, label: 'All' },
    { name: ItemCategory.iOS, icon: <AppleIcon className="w-5 h-5 mr-2" />, label: ItemCategory.iOS },
    { name: ItemCategory.Android, icon: <AndroidIcon className="w-5 h-5 mr-2" />, label: ItemCategory.Android },
  ];

  return (
    <div className="flex bg-gray-200 p-1 rounded-lg space-x-1">
      {categories.map(cat => (
        <button
          key={cat.name}
          onClick={() => onCategoryChange(cat.name)}
          className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150
            ${currentCategory === cat.name 
              ? 'bg-white text-ios-blue shadow' 
              : 'text-gray-600 hover:bg-gray-300'
            }`}
          aria-pressed={currentCategory === cat.name}
        >
          {cat.icon}
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySwitcher;