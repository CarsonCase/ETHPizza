import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { MenuItem } from "../interfaces/MenuItem";

interface CartItemCardProps {
  item: MenuItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-24 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold mb-2 text-black">{item.title}</h2>
      <p className="text-lg font-semibold text-black">${item.price.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        +
      </button>
      <button
      className='bg-blue-500 text-white py-2 px-4 float-right rounded-lg mt-4 hover:bg-blue-600'
      onClick={handleRemoveFromCart}>
        -
      </button>
    </div>
  );
};

export default CartItemCard;
