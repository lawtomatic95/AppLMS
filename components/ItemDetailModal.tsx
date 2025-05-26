import React from 'react';
import Modal from './Modal'; // Assuming Modal is a generic modal wrapper
import { Item, ItemCategory } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ItemDetailModalProps {
  item: Item | null; // Null when modal is closed
  onClose: () => void;
  isOpen: boolean;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, isOpen }) => {
  if (!isOpen || !item) {
    return null;
  }

  const WHATSAPP_PHONE_NUMBER = '12312312345'; // Replace with actual phone number

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, me interesa el producto: ${item.name}`);
    const whatsappLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

   const formatPrice = (amount: number, currency: 'ARS' | 'USD') => {
    return `${currency} $${amount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name}>
      <div className="bg-white rounded-lg shadow-xl max-w-lg mx-auto overflow-hidden w-full">
        <img
          src={item.imageUrl || 'https://picsum.photos/seed/modalitem/800/600'}
          alt={item.name}
          className="w-full h-64 object-cover"
          onError={(e) => (e.currentTarget.src = 'https://picsum.photos/seed/modalitem/800/600?grayscale&blur=2')}
        />
        <div className="p-6">
          <p className="text-gray-700 mb-4">{item.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">Precio (ARS):</p>
              <p className="text-lg font-bold text-ios-blue">{formatPrice(item.priceARS, 'ARS')}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Precio (USD):</p>
              <p className="text-lg font-bold text-gray-800">{formatPrice(item.priceUSD, 'USD')}</p>
            </div>
             <div>
              <p className="text-sm font-semibold text-gray-600">Stock:</p>
              <p className="text-lg font-bold text-gray-800">{item.stock}</p>
            </div>
             <div>
              <p className="text-sm font-semibold text-gray-600">Categoría:</p>
              <p className="text-lg font-bold text-gray-800">{item.category}</p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center w-full bg-green-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow hover:bg-green-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <WhatsAppIcon className="w-6 h-6 mr-3" /> Consultar por WhatsApp
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemDetailModal; 