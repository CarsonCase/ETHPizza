import { data } from "autoprefixer";
import { MenuItem } from "../../interfaces/MenuItem"
import { Order } from "../../interfaces/Order"

  export async function getMenuItems(): Promise<MenuItem[]> {
    const response = await fetch(process.env.BACKEND_ENDPOINT+"/menuItems");
    const data: MenuItem[] = await response.json();
    return data;
  }

  export async function getOrdersList(): Promise<Order[]> {
    const response = await fetch(process.env.BACKEND_ENDPOINT+"/orders");
    const data: Order[] = await response.json();
    return data;
  }

  export async function updateOrder(order: Order){
    try {
      const response = await fetch(process.env.BACKEND_ENDPOINT+'updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
  }catch(e){
    throw (e)
  }

  }

  export async function postOrder(order: Order){
    try {
      const response = await fetch(process.env.BACKEND_ENDPOINT+'/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  }catch(e){
    throw (e)
  }
}