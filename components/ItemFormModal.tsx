import React, { useState, useEffect } from 'react';
import { Item, ItemCategory } from '../types';
import Modal from './Modal';

interface ItemFormModalProps {
  itemToEdit: Item | null;
  defaultCategory?: ItemCategory; 
  onClose: () => void;
  onSave: (item: Item | Omit<Item, 'id'>) => void;
}

const ItemFormModal: React.FC<ItemFormModalProps> = ({ itemToEdit, defaultCategory, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceArs, setPriceArs] = useState('');
  const [priceUsd, setPriceUsd] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState<ItemCategory>(defaultCategory || ItemCategory.iOS);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFileError, setImageFileError] = useState<string | null>(null);

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setPriceArs(itemToEdit.priceARS.toString());
      setPriceUsd(itemToEdit.priceUSD.toString());
      setStock(itemToEdit.stock.toString());
      setCategory(itemToEdit.category);
      setImageUrl(itemToEdit.imageUrl);
    } else {
      setName('');
      setDescription('');
      setPriceArs('');
      setPriceUsd('');
      setStock('');
      setCategory(defaultCategory || ItemCategory.iOS);
      setImageUrl('');
    }
    setImageFileError(null); // Reset error on modal open/switch item
  }, [itemToEdit, defaultCategory]);

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFileError(null); // Reset error at the start
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Max 5MB
        setImageFileError("File is too large. Max 5MB allowed.");
        if (event.target) event.target.value = ''; // Clear the input
        setImageUrl(itemToEdit?.imageUrl || ''); // Revert to original/empty if file is invalid
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setImageFileError("Error reading file. Please try another image.");
        if (event.target) event.target.value = ''; // Clear the input
        setImageUrl(itemToEdit?.imageUrl || ''); // Revert to original/empty on error
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFileError) {
        alert(`Cannot save: ${imageFileError}`);
        return;
    }

    const parsedPriceARS = parseFloat(priceArs);
    const parsedPriceUSD = parseFloat(priceUsd);
    const parsedStock = parseInt(stock, 10);

    if (isNaN(parsedPriceARS) || parsedPriceARS < 0 || isNaN(parsedPriceUSD) || parsedPriceUSD < 0 || isNaN(parsedStock) || parsedStock < 0) {
      alert("Please enter valid positive numbers for prices and stock.");
      return;
    }
    if (!name.trim() || !description.trim()) {
        alert("Name and description cannot be empty.");
        return;
    }

    const finalImageUrl = imageUrl.trim() || `https://picsum.photos/seed/${name.trim().replace(/\s+/g, '-') || 'default'}/600/400`;

    const itemData = { 
      name: name.trim(), 
      description: description.trim(), 
      priceARS: parsedPriceARS, 
      priceUSD: parsedPriceUSD, 
      stock: parsedStock, 
      category, 
      imageUrl: finalImageUrl
    };

    if (itemToEdit) {
      onSave({ ...itemData, id: itemToEdit.id });
    } else {
      onSave(itemData);
    }
  };
  
  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-ios-blue sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <Modal isOpen={true} onClose={onClose} title={itemToEdit ? 'Edit Item' : 'Add New Item'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} h-24`} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priceArs" className={labelClass}>Price (ARS)</label>
            <input type="number" id="priceArs" value={priceArs} onChange={(e) => setPriceArs(e.target.value)} className={inputClass} required min="0" step="any" placeholder="e.g., 12500.50" />
          </div>
          <div>
            <label htmlFor="priceUsd" className={labelClass}>Price (USD)</label>
            <input type="number" id="priceUsd" value={priceUsd} onChange={(e) => setPriceUsd(e.target.value)} className={inputClass} required min="0" step="any" placeholder="e.g., 125.50"/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="stock" className={labelClass}>Stock</label>
            <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className={inputClass} required min="0" step="1" />
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value as ItemCategory)} className={inputClass}>
              <option value={ItemCategory.iOS}>iOS</option>
              <option value={ItemCategory.Android}>Android</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="imageFile" className={labelClass}>Upload Image (optional - max 5MB)</label>
          <input 
            type="file" 
            id="imageFile" 
            onChange={handleImageFileChange} 
            className={`${inputClass} p-0 file:mr-4 file:py-2.5 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-ios-blue file:text-white hover:file:bg-blue-600 cursor-pointer`} 
            accept="image/png, image/jpeg, image/gif, image/webp" 
          />
          {imageFileError && <p className="text-xs text-red-500 mt-1">{imageFileError}</p>}
        </div>

        <div>
          <label htmlFor="imageUrlInput" className={labelClass}>Or Image URL (optional)</label>
          <input 
            type="url" 
            id="imageUrlInput" 
            value={imageUrl.startsWith('data:image') ? '' : imageUrl} 
            onChange={(e) => { 
              setImageUrl(e.target.value); 
              setImageFileError(null); 
              const fileInput = document.getElementById('imageFile') as HTMLInputElement | null;
              if (fileInput) {
                fileInput.value = ''; // Clear the file input selection
              }
            }}
            className={inputClass} 
            placeholder="https://example.com/image.png" 
          />
        </div>
        
        {(imageUrl) && (
          <div className="mt-2">
            <p className={labelClass}>Image Preview:</p>
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="mt-1 rounded-lg max-h-40 object-contain border border-gray-200 p-1" 
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.startsWith('data:image')) {
                    target.src = 'https://picsum.photos/seed/preview-error/200/100?text=Invalid+Link';
                    target.alt = 'Invalid or broken image link';
                } else {
                    target.alt = 'Invalid image data';
                    target.style.display = 'none'; // Hide broken data URL preview
                    if (!imageFileError) setImageFileError("Preview failed: Invalid image data. Please try another file or URL.");
                }
              }}
            />
          </div>
        )}

        <div className="pt-2 flex justify-end space-x-3">
            <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-ios-blue rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                {itemToEdit ? 'Save Changes' : 'Add Item'}
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default ItemFormModal;