import React from 'react';
import { Item } from '../types';
import ItemCard from './ItemCard';

interface ItemListProps {
  items: Item[];
  isLoggedIn: boolean;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
  onCardClick: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, isLoggedIn, onEdit, onDelete, onCardClick }) => {
  if (items.length === 0) {
    return null; // Message handled in App.tsx for better context
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          isLoggedIn={isLoggedIn}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default ItemList;
    