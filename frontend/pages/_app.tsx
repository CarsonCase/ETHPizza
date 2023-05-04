import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { CartProvider } from '../contexts/CartContext';
import CartButton from '../components/CartButton';
import { EthPriceProvider } from '../contexts/ETHPriceContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EthPriceProvider>
    <CartProvider>
      <Component {...pageProps} />
      <CartButton />
    </CartProvider>
    </EthPriceProvider>
  )
}
