import React from 'react';
import { Order } from '@/interfaces/Order';

type Props = {
  data: Order[];
};

const SalesDataButton: React.FC<Props> = ({ data }) => {
  const downloadCSV = () => {
    const filteredData = data.filter(
      (order) => order.orderStatus === 2 || order.orderStatus === 3 || order.orderStatus === 4
    );

    const csvContent =
      'id,valueUSD,valueETH\n' +
      filteredData
        .map((order) => `${order.id},${(order as any).PriceData.priceUSD},${(order as any).PriceData.priceETH}`)
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button className="rounded-full bg-gray-500 border border-blue-500 p-2 text-white" onClick={downloadCSV}>Download CSV</button>;
};

export default SalesDataButton;
