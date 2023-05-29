import { createContext, useContext, useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';

interface EthPriceContextValue {
  ethPrice: number | null;
}

const EthPriceContext = createContext<EthPriceContextValue>({
  ethPrice: null,
});

export const useEthPrice = () => useContext(EthPriceContext);

interface CoingeckoApiResponse {
  ethereum: {
    usd: number;
  };
}

export const EthPriceProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEthPrice() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data: CoingeckoApiResponse = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Failed to fetch ETH price:', error);
      }
    }

    fetchEthPrice();
  }, []);

  return (
    <EthPriceContext.Provider value={{ ethPrice }}>
      {children}
    </EthPriceContext.Provider>
  );
};
