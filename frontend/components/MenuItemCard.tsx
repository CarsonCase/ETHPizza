import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { MenuItem, Type } from "../interfaces/MenuItem";
import PizzaCustomization from './cusomization/PizzaCustomization';
import DrinkCustomization from './cusomization/DrinkCustomization';
interface MenuItemCardProps {
  item: MenuItem;
}


const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const [showCustomization, setShowCustomization] = useState(false);

  const handleAddToCart = () => {
    setShowCustomization(true);
    // for exception types that do not have customization
    if(item.type === Type.side){
      addToCart(item);
      setShowCustomization(false);
    }
  };

  const handleCustomizationComplete = (customizedItem: MenuItem) => {
    addToCart(customizedItem);
    setShowCustomization(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold mb-2 text-black">{item.title}</h2>
      <p className="text-lg font-semibold text-black">${item.price.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      {showCustomization && item.type === Type.pizza &&(
        <PizzaCustomization
          item={item}
          onComplete={handleCustomizationComplete}
        />
      )}
      {showCustomization && item.type === Type.drink &&(
        <DrinkCustomization
          item={item}
          onComplete={handleCustomizationComplete}
        />
      )}

    </div>
  );
};

export default MenuItemCard;
