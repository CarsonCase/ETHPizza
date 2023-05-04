import { useEthPrice } from '@/contexts/ETHPriceContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CoingeckoApiResponse {
    ethereum: {
      usd: number;
    };
  }
  
  
const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const { ethPrice } = useEthPrice();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };



  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
            ETH Pizza
        </Link>
        <div className="flex space-x-4">
            <div className="bg-gray-700 w-24 h-12 rounded-md flex items-center justify-center text-gray-300 font-bold text-xl mr-4">
                {ethPrice ? `$${ethPrice.toFixed(2)}` : 'Loading...'}          
            </div>
          <button
            className={`${
              activeTab === 'new-order' ? 'bg-gray-700' : ''
            } px-3 py-2 rounded-md hover:bg-gray-700`}
            onClick={() => handleTabClick('new-order')}
          >
            <Link href="/new-order">
              Menu
            </Link>
          </button>
          <button
            className={`${
              activeTab === 'orderList' ? 'bg-gray-700' : ''
            } px-3 py-2 rounded-md hover:bg-gray-700`}
            onClick={() => handleTabClick('orderList')}
          >
            <Link href="/orderList">
              Order List
            </Link>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
