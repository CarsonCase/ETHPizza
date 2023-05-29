import React, { useEffect, useState } from 'react';
import { Order, Status} from '@/interfaces/Order';
import { getOrderStatusColor, getOrderStatusString, getOrderRefundable } from '../utils/orderStatus';
import { getOrdersList } from './api/api';
import Navbar from '@/components/Navbar';
import { RefundButton } from '@/components/RefundButton';
import SalesDataButton from '@/components/SalesDataButton';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    // every 3 seconds after refresh
    useEffect(() => {
      const fetchOrders = async () => {
        const data = await getOrdersList();
        setOrders(data);
      };
      
      //on load first call fetchOrders
      fetchOrders();

      // Call fetchOrders every 3 seconds
      const intervalId = setInterval(fetchOrders, 3000);
  
      // Clean up the interval on unmount
      return () => clearInterval(intervalId);
    }, []);
  


  return (
    <div>
    <Navbar></Navbar>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order Price (ETH)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Refund
                      </th>

                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id as string}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {/* {new Date(order.date).toLocaleDateString()} */}
                            {(order as any).PriceData.priceETH}
                          </div>
                        </td>
                        <div className={`${getOrderStatusColor(order.orderStatus)}`}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                            {getOrderStatusString(order.orderStatus)}
                          </span>
                        </td>
                        </div>
                        <td className='px-6 py-4 whitespace-nowrap'>
                            <RefundButton order={order}></RefundButton>
                            </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <SalesDataButton data={orders}></SalesDataButton>

        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
