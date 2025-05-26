import React from 'react';
import { Item } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ItemCardProps {
  item: Item;
  isLoggedIn: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onCardClick: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, isLoggedIn, onEdit, onDelete, onCardClick }) => {
  const formatPrice = (amount: number, currency: 'ARS' | 'USD') => {
    return `${currency} $${amount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div
      className="bg-ios-system-background rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl cursor-pointer"
      onClick={() => onCardClick(item)}
    >
      <img 
        src={item.imageUrl || 'https://picsum.photos/600/400?grayscale'} 
        alt={item.name} 
        className="w-full h-48 object-cover" 
        onError={(e) => (e.currentTarget.src = 'https://picsum.photos/600/400?grayscale&blur=2')}
      />
      <div className="p-3 flex flex-col flex-grow relative">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 break-words">{item.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
