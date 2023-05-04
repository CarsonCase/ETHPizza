import { useState } from "react";
import { updateOrder } from '../pages/api/api';
import { Order, Status } from "@/interfaces/Order";
import { OrderPricing } from "@/interfaces/OrderPricing";

import {ethers} from "ethers";
import Router from "../public/Router.json";
import { getOrderRefundable } from "@/utils/orderStatus";

interface RefundButtonProps {
    order: Order;
  }
  
  export const RefundButton: React.FC<RefundButtonProps> = ({ order }) => {
    const [isRefunding, setIsRefunding] = useState(false);

  const handleRefund = async () => {
    setIsRefunding(true);

    if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access
          const provider = new ethers.BrowserProvider(window.ethereum)
  
          const signer = await provider.getSigner();
          const contractAddress = Router.address;
          const abi = Router.abi;
          const contract = new ethers.Contract(contractAddress, abi, signer as any);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await provider.listAccounts();
        
          // Call the smart contract function
          const val = ethers.parseEther((order as any).PriceData.priceETH);
          console.log(order.maker)
          const tx = await contract.issueRefund(order.maker, val);
  
          // Wait for the transaction to be mined
          const receipt = await tx.wait();
  
          order.orderStatus = Status.refunded;
          updateOrder(order);
  
          setIsRefunding(false);
        } catch (error) {
            console.error(error);
            setIsRefunding(false);
        }
  
      } else {
        alert('Please install MetaMask to use this feature.');
      }
  
  };

  return (
    <div>
    {getOrderRefundable(order.orderStatus) ? (
    <button className='rounded-full bg-blue-500 border border-blue-500 p-2 text-white' onClick={handleRefund} disabled={isRefunding}>
        {isRefunding ? "Refunding..." : "Refund"}
  </button>
  ) : (
    <button className='rounded-full bg-gray-500 border border-gray-500 p-2 text-white' onClick={handleRefund} disabled={isRefunding}>
        {isRefunding ? "Refunding..." : "Refund"}
    </button>
    )}

    </div>
  );
};
