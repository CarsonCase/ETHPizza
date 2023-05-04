import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

function handleClick() {
  console.log('Button clicked');
}

export default function Home() {
  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">POS System</h1>
          <div className="space-y-4">
            <Link href="/new-order"
              className="block w-full py-2 px-4 bg-blue-500 text-white text-center font-semibold rounded-lg hover:bg-blue-600">
                Place a New Order
            </Link>
            <Link href="/orderList" className="block w-full py-2 px-4 bg-blue-500 text-white text-center font-semibold rounded-lg hover:bg-blue-600">
                View List of Orders
            </Link>
          </div>
        </div>
      </div>  
  );
}
