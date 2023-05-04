import React, { useState } from 'react';
import { MenuItem, Size } from '../../interfaces/MenuItem';

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
      size: value as Size,
    }));
  };

  const handleCrustChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCustom((prevCrust) => ({
      ...prevCrust,
      crust: value as Crust,
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
            <option value={Size.small}>Small</option>
            <option value={Size.medium}>Medium</option>
            <option value={Size.large}>Large</option>
            <option value={Size.extraLarge}>Extra Large</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-black">Crust:</p>
          <select
            className="border border-gray-400 rounded-lg p-2 text-black"
            value={custom.crust}
            onChange={handleCrustChange}
          >
            <option value={Size.small}>Classic</option>
            <option value={Size.medium}>Italian</option>
            <option value={Size.large}>Gluenten-Free</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-black">Toppings:</p>
          <div>
            <label className="inline-flex items-center px-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                name="bacon"
                checked={custom.topings.bacon}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Bacon</span>
            </label>
            <label className="inline-flex items-center px-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                name="pineapple"
                checked={custom.topings.pineapple}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Pineapple</span>
            </label>
            <label className="inline-flex items-center px-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                name="olivescript"
                checked={custom.topings.olives}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Olive</span>
            </label>
            <label className="inline-flex items-center px-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                name="peperoni"
                checked={custom.topings.peperoni}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Peperoni</span>
            </label>
            <label className="inline-flex items-center px-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                name="sausage"
                checked={custom.topings.sausage}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Sausage</span>
            </label>
            <label className="inline-flex items-center px-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                name="extraCheese"
                checked={custom.topings.extraCheese}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Extra Cheese</span>
            </label>
          </div>
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
