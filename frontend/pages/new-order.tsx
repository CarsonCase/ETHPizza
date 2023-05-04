import React, { useEffect, useState } from "react";

import MenuItemCard from '../components/MenuItemCard';
import { getMenuItems } from "./api/api";
import { MenuItem, Type } from "@/interfaces/MenuItem";
import Navbar from "@/components/Navbar";

const NewOrderPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<Type | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await getMenuItems();
      setMenuItems(data);
    }
    fetchData();
  }, []);

  const filteredMenuItems = activeTab === null
    ? menuItems
    : menuItems.filter((item) => item.type === activeTab);

  const searchedMenuItems = filteredMenuItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Menu Items</h1>
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-4">
            <button
              className={`mr-4 ${
                activeTab === null ? "bg-gray-300" : "bg-gray-200"
              } px-4 py-2 rounded-md`}
              onClick={() => setActiveTab(null)}
            >
              All
            </button>
            <button
              className={`mr-4 ${
                activeTab == Type.pizza ? "bg-gray-300" : "bg-gray-200"
              } px-4 py-2 rounded-md`}
              onClick={() => setActiveTab(Type.pizza)}
            >
              Pizzas
            </button>
            <button
              className={`mr-4 ${
                activeTab === Type.side ? "bg-gray-300" : "bg-gray-200"
              } px-4 py-2 rounded-md`}
              onClick={() => setActiveTab(Type.side)}
            >
              Sides
            </button>
            <button
              className={`mr-4 ${
                activeTab === Type.drink ? "bg-gray-300" : "bg-gray-200"
              } px-4 py-2 rounded-md`}
              onClick={() => setActiveTab(Type.drink)}
            >
              Drinks
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-400 rounded-md px-4 py-2 w-full max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchedMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewOrderPage;
