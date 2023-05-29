import React, { useState } from 'react';
import { MenuItem, Size, Crust } from '../../interfaces/MenuItem';

interface MenuItemCustomizationProps {
  item: MenuItem;
  onComplete: (customizedItem: MenuItem) => void;
}

const MenuItemCustomization: React.FC<MenuItemCustomizationProps> = ({
  item,
  onComplete,
}) => {
  const [custom, setCustom] = useState(item.custom);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    setCustom((prevCustom) => ({
      ...prevCustom,
      topings: {
        ...prevCustom.topings,
        [name]: checked,
      },
    }));
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCustom((prevCustom) => ({
      ...prevCustom,
      size: value as unknown as Size,
    }));
  };

  const handleCrustChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCustom((prevCrust) => ({
      ...prevCrust,
      crust: value as unknown as Crust,
    }));
  };

  const handleComplete = () => {
    const customizedItem: MenuItem = {
      ...item,
      custom,
    };
    onComplete(customizedItem);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-2 text-black">Customize {item.title}</h2>
        <div className="mb-4">
          <p className="text-lg font-semibold text-black">Size:</p>
          <select
            className="border border-gray-400 rounded-lg p-2 text-black"
            value={custom.size}
            onChange={handleSizeChange}
          >
            <option value={Size.eight_oz}>8 oz</option>
            <option value={Size.twellve_oz}>12 oz</option>
            <option value={Size.sixteen_oz}>16 oz</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
          onClick={handleComplete}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItemCustomization;
