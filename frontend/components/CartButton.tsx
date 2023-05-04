import Cart from "./Cart";
import React, { useContext, useState } from 'react';

const CartButton: React.FC = ()=>{
    const [cartVisible, setCartVisible] = useState<boolean>(false);
    const handleToggleCart = () => {
        setCartVisible(!cartVisible);
      };

    return (
        <div>
            <button onClick={handleToggleCart} className="fixed bottom-4 left-4 bg-blue-500 text-white w-20 h-20 rounded-full shadow-md hover:bg-blue-600">
                {cartVisible? 'Hide Cart' : 'Show Cart'}
            </button>
            {cartVisible && <Cart></Cart>}
        </div>
    );
    
}

export default CartButton;