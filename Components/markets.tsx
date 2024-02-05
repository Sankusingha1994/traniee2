// pages/coin/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Container, Typography } from '@mui/material';
import axios from 'axios';



const CoinMarketPage = () => {
  const router = useRouter();
  const { market } = router.query;

  const fetchCoinMarket = async ( market: string) => {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${market}/markets`);
    return response.data;
  };

  if( market){
    const { data, isLoading, isError } = useQuery(['coin',  market], () => fetchCoinMarket( market as string));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching coin details</Typography>;
  console.log(data)

  return (
    <Container>
     
      <Typography variant="h4">{data.data.exchangeId}</Typography>
      <Typography variant="h4">{data.data.baseSymbol}</Typography>
      <Typography variant="h4">{data.data.priceUsd}</Typography>
      {/* Display other coin details, history, market data */}
    </Container>
  );
  }

  
};

export default CoinMarketPage;
