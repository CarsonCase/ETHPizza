import React, { useContext, useState } from 'react';
import { ethers } from 'ethers';
import { CartContext } from '../contexts/CartContext';
import MenuItem from "./MenuItemCard";
import Router from "../public/Router.json";
import { Order, Status } from '@/interfaces/Order';
import { getMenuItems, postOrder } from "../pages/api/api";
import { OrderPricing } from "@/interfaces/OrderPricing";
import { useEthPrice } from '@/contexts/ETHPriceContext';
import QRCode from 'qrcode.react';
import CloseButton from './CloseButton';


const CheckoutButton: React.FC = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { ethPrice } = useEthPrice();
  const [paymentAddress, setPaymentAddress] = useState<string | null>(null);

  const handleCheckout = async () => {
    const coder = ethers.AbiCoder.defaultAbiCoder();
    // Check if MetaMask is installed
    
    if (typeof window.ethereum !== 'undefined') {
      try {
        // get order price info
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
        const ethPrice_ = ethers.formatEther(
            ethers.parseUnits(ethers.parseUnits(totalPrice.toString()).toString()) / (
            ethers.parseUnits((ethPrice as any).toString())
          )
        );
        console.log(ethPrice_);
        // Request account access
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const contractAddress = Router.address;
        const abi = Router.abi;
        const contract = new ethers.Contract(contractAddress, abi, signer as any);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.listAccounts();

        // Call the smart contract function
        const tx = await contract.newOrder(ethers.parseUnits(ethPrice_));

        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        // Find the OrderCreated event in the transaction receipt
        
        // after successful call push order to DB
        const paymentAddress_ = coder.decode([ "address" ], (receipt as any).logs[0].topics[1])[0];
        console.log("payment address: ", paymentAddress_);

        const price: OrderPricing = {
            priceUSD: totalPrice,
            priceETH: ethPrice_
        };
        const order: Order = {
            id: paymentAddress_ as string,
            menuItems: cartItems,
            priceData: price,
            orderStatus: Status.unpaid,
            maker: accounts[0].address
        };
        postOrder(order);
        clearCart();

        setPaymentAddress(paymentAddress_);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  };

  const handleClose = () => {
    setPaymentAddress(null);
  };


  return (
    <>
      <button
        className="fixed bottom-4 left-4 bg-blue-500 text-white w-20 h-20 rounded-full shadow-md hover:bg-blue-600"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      {paymentAddress && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md relative p-5">
            {/* <button className="text-center text-gray-500 mt-2" onClick={handleClose}> X </button> */}
            <CloseButton onClick={handleClose}/>
            <QRCode value={`ethereum:${paymentAddress}`} />
            <p className="text-center text-gray-500 mt-2">Scan to pay</p>
          </div>
        </div>
      )}    
      </>
  );
};

export default CheckoutButton;
