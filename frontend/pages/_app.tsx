import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { CartProvider } from '../contexts/CartContext';
import CartButton from '../components/CartButton';
import { EthPriceProvider } from '../contexts/ETHPriceContext';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>ETH Pizza</title>
      </Head>
    <EthPriceProvider>
    <CartProvider>
      <Component {...pageProps} />
      <CartButton />
    </CartProvider>
    </EthPriceProvider>
    </div>
  )
}
