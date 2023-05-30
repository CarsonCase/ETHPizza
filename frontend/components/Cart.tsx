import React, { useContext, useState } from 'react';
import { ethers } from 'ethers';
import { CartContext } from '../contexts/CartContext';
import CartItemCard from './CartItem';
import Router from "../Router.json";
import { Order, Status } from '@/interfaces/Order';
import { getMenuItems, postOrder } from "../pages/api/api";
import { OrderPricing } from "@/interfaces/OrderPricing";
import { useEthPrice } from '@/contexts/ETHPriceContext';
import QRCode from 'qrcode.react';
import CloseButton from './CloseButton';

const salesTaxRate: number = parseFloat(process.env.SALES_TAX_RATE || "0");

declare global {
  interface Window{
    ethereum?:any
  }
}

const Cart: React.FC = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { ethPrice } = useEthPrice();
  const [paymentAddress, setPaymentAddress] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  const handleCheckout = async () => {
    const coder = ethers.AbiCoder.defaultAbiCoder();
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        // get order price info
        const totalPrice = getTotal();
        const ethPrice_ = ethers.formatEther(
            ethers.parseUnits(ethers.parseUnits(totalPrice.toString()).toString()) / (
            ethers.parseUnits((ethPrice as any).toString())
          )
        );

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

  const placeDiscount = (num :number) => {
    if(num > 100){
      throw new Error("Discount cannot be more than 100%");
    }

    if(num < 0){
      throw new Error("Discount cannot be less than 0%");
    }

    setDiscount(num);
  }

  const keep2Decimals = (num: number) : number=> {
    return Math.round(num * 100) / 100;
    }
    const getTax = () => {
        return keep2Decimals(salesTaxRate * getSubtotal());
    }
    const getTotal = ()=>{
        return keep2Decimals(getSubtotal() - getTax());
    }

    const getSubtotal = ()=>{
        return keep2Decimals(cartItems.reduce((acc, item) => acc + item.price, 0) - cartItems.reduce((acc, item) => acc + item.price, 0) * discount / 100);
    }

  return (
    <>
      <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-md overflow-y-scroll text-black">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          <hr />
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold">SubTotal:</p>
                <p className="text-lg font-bold">${getSubtotal()}</p>
                <p className="text-lg font-bold">Tax:</p>
                <p className="text-lg font-bold">${getTax()}</p>
                <p className="text-lg font-bold">Total:</p>
                <p className="text-lg font-bold">${getTotal()}</p>
              </div>
              <form onSubmit={(e) => {
              e.preventDefault();
              placeDiscount(discount);
            }}>
              <div className="flex items-center mb-4">
                <label htmlFor="discount" className="mr-2">Discount:</label>
                <input type="number" id="discount" name="discount" min="0" max="100" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} className="border border-gray-400 rounded-md px-2 py-1 w-20" />
                <span className="ml-2">%</span>
              </div>
          </form>
              <button
                className="bg-blue-500 text-white w-full py-2 mt-4 rounded-md shadow-md hover:bg-blue-600"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
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

export default Cart;
