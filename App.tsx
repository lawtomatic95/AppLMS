import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Item, ItemCategory, ToastMessage, DisplayCategory } from './types';
import { APP_PASSWORD } from './constants';
import Header from './components/Header';
import ItemList from './components/ItemList';
import LoginModal from './components/LoginModal';
import ItemFormModal from './components/ItemFormModal';
import Toast from './components/Toast';
import CategorySwitcher from './components/CategorySwitcher';
import ItemDetailModal from './components/ItemDetailModal';
import { PlusIcon } from './components/icons/PlusIcon';
import initialItemsData from './initialData';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>(initialItemsData);
  const [currentCategory, setCurrentCategory] = useState<DisplayCategory>('All'); 
  
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showItemFormModal, setShowItemFormModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  
  const [showItemDetailModal, setShowItemDetailModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [toast, setToast] = useState<ToastMessage>(null);

  // Add useEffect to check for URL hash on load and hash change
  useEffect(() => {
    const checkHashForAdminLogin = () => {
      if (window.location.hash === '#admin-login' && !isLoggedIn) {
        setShowLoginModal(true);
        // Optionally clear the hash from the URL after showing the modal
        if (window.history.replaceState) {
          const newUrl = window.location.pathname + window.location.search;
          window.history.replaceState({}, '', newUrl);
        }
      }
    };

    // Check on initial load
    checkHashForAdminLogin();

    // Listen for hash changes (e.g., if user manually changes hash)
    window.addEventListener('hashchange', checkHashForAdminLogin);

    // Cleanup listener
    return () => {
      window.removeEventListener('hashchange', checkHashForAdminLogin);
    };
  }, [isLoggedIn]); // Depend on isLoggedIn to potentially show modal if user logs out and hash is present

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ id: Date.now().toString(), message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleLogin = (password: string) => {
    if (password === APP_PASSWORD) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      showToast('Login successful!', 'success');
      // Clean up any admin parameter or hash from URL on successful login
      if (window.history.pushState) {
         const newUrl = window.location.pathname; // Keep only the base path
         window.history.pushState({path:newUrl},'',newUrl);
      }
    } else {
      showToast('Invalid password.', 'error');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Logged out.', 'success');
  };

  const handleAdminLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleAddItem = (itemData: Omit<Item, 'id'>) => {
    const newItem = { ...itemData, id: Date.now().toString() } as Item;
    setItems(prevItems => [...prevItems, newItem]);
    setShowItemFormModal(false);
    showToast('Item added successfully!', 'success');
  };

  const handleEditItem = (updatedItem: Item) => {
    setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    setShowItemFormModal(false);
    setEditingItem(null);
    showToast('Item updated successfully!', 'success');
  };

  const handleDeleteItem = (itemId: string) => {
    console.log("[App.tsx] Attempting to delete item with ID:", itemId);
    console.log("[App.tsx] Items before delete:", items);
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      console.log("[App.tsx] Items after filter (new state to be set):", newItems);
      return newItems;
    });
    showToast('Item deleted successfully!', 'success');
  };

  const openItemFormForEdit = (item: Item) => {
    setEditingItem(item);
    setShowItemFormModal(true);
  };

  const openItemFormForAdd = () => {
    setEditingItem(null);
    setShowItemFormModal(true);
  };
  
  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setShowItemDetailModal(true);
  };

  const handleCloseItemDetailModal = () => {
    setShowItemDetailModal(false);
    setSelectedItem(null);
  };

  const handleSaveItem = (itemData: Item | Omit<Item, 'id'>) => {
      if ('id' in itemData) {
          handleEditItem(itemData as Item);
      } else {
          handleAddItem(itemData as Omit<Item, 'id'>);
      }
  };

  const filteredItems = useMemo(() => {
    if (currentCategory === 'All') {
      return items;
    }
    return items.filter(item => item.category === currentCategory);
  }, [items, currentCategory]);

  let emptyStateMessage = null;
  if (items.length === 0) {
    emptyStateMessage = (
      <div className="text-center text-ios-gray py-10">
        <p className="text-xl">No items available at the moment.</p>
        {isLoggedIn && <p>Click "Add New Item" to get started!</p>}
      </div>
    );
  } else if (filteredItems.length === 0 && currentCategory !== 'All') {
    emptyStateMessage = (
      <div className="text-center text-ios-gray py-10">
        <p className="text-xl">No items in the {currentCategory} category yet.</p>
        {isLoggedIn && currentCategory !== ItemCategory.iOS && currentCategory !== ItemCategory.Android && <p>Click "Add New Item" to get started!</p>}
        {isLoggedIn && (currentCategory === ItemCategory.iOS || currentCategory === ItemCategory.Android) && <p>You can add items to this category or switch to another.</p>}
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-ios-light-gray font-sans text-gray-800">
      <Header 
        isLoggedIn={isLoggedIn} 
        onAdminLoginClick={handleAdminLoginClick}
        onLogoutClick={handleLogout} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <CategorySwitcher 
            currentCategory={currentCategory} 
            onCategoryChange={setCurrentCategory} 
          />
          {isLoggedIn && (
            <button
              onClick={openItemFormForAdd}
              className="flex items-center justify-center bg-ios-blue text-white px-4 py-2.5 rounded-lg shadow-sm hover:bg-blue-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add New Item
            </button>
          )}
        </div>

        { (items.length > 0 || (items.length === 0 && !isLoggedIn) ) && 
            <ItemList 
              items={filteredItems} 
              isLoggedIn={isLoggedIn}
              onEdit={openItemFormForEdit}
              onDelete={handleDeleteItem}
              onCardClick={handleCardClick}
            />
        }
        
        {emptyStateMessage}

      </main>

      {showLoginModal && (
        <LoginModal 
          onClose={() => {
            setShowLoginModal(false);
             // Optionally remove the admin query parameter from URL if modal is closed without login
            if (window.history.pushState) {
                const searchParams = new URLSearchParams(window.location.search);
                if (searchParams.get('admin') === 'true') {
                    const newUrl = window.location.pathname;
                    window.history.pushState({path:newUrl},'',newUrl);
                }
            }
          }} 
          onLogin={handleLogin} 
        />
      )}

      {showItemFormModal && (
        <ItemFormModal 
          itemToEdit={editingItem}
          defaultCategory={ (currentCategory !== 'All') ? currentCategory : undefined }
          onClose={() => {
            setShowItemFormModal(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
        />
      )}
      
      <ItemDetailModal 
        isOpen={showItemDetailModal}
        item={selectedItem}
        onClose={handleCloseItemDetailModal}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
