import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { FaGithub, FaEnvelope, FaMedium } from 'react-icons/fa';


const inter = Inter({ subsets: ['latin'] })

function handleClick() {
  console.log('Button clicked');
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-black">
        <h1 className="text-4xl font-bold mb-6">ETH Pizza POS System</h1>
        <p className="text-lg mb-6">
        Hey there, I'm Carson Case, a freelance software developer specializing in web3 projects and always on the lookout for new opportunities. This is my latest project, ETH Pizza, a fictional Pizza Company Ethereum POS system. With features like searchable menu items, promotional rewards tokens, and order tracking. <br></br>
        <hr />My expertise is in Solidity Smart Contract development, but ETH Pizza also shows I'm capable with Frontend (React) and Backend (GoLang), and more importantly demonstrates my understanding of the software development process, and basic project management. If you're interested in learning more about this project, the process of it's development was documented on Medium, the link to which you can find below along with my contact information. Don't hesitate to send a quick email with your preferred contact information!
        </p>
        <div className="flex justify-center space-x-4 mb-6">
          <a href="https://github.com/carsoncase" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
            <FaGithub size={24} />
          </a>
          <a href="mailto:carsonpcase@gmail.com" className="text-gray-500 hover:text-gray-700">
            <FaEnvelope size={24} />
          </a>
          <a href="https://medium.com/@carsonpcase" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
            <FaMedium size={24} />
          </a>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/new-order"
            className="py-3 px-6 bg-purple-500 text-white text-center font-semibold rounded-lg hover:bg-purple-600">
              New Order
          </Link>
          <Link href="/orderList" className="py-3 px-6 bg-blue-500 text-white text-center font-semibold rounded-lg hover:bg-blue-600">
              Order List
          </Link>
        </div>
      </div>
    </div>  
  );
}
