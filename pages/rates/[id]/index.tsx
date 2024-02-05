// pages/coin/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Container, Typography } from '@mui/material';
import axios from 'axios';



const CoinDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchCoinDetails = async (id: string) => {
    const response = await axios.get(`https://api.coincap.io/v2/rates/${id}`);
    return response.data;
  };

  if(id){
    const { data, isLoading, isError } = useQuery(['coin', id], () => fetchCoinDetails(id as string));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching coin details</Typography>;
  console.log(data)

  return (
    <Container>
     
      <Typography variant="h4">{data.data.id}</Typography>
      <Typography variant="h4">{data.data.symbol}</Typography>
      <Typography variant="h4">{data.data.currencySymbol}</Typography>
      <Typography variant="h4">{data.data.type}</Typography>
      <Typography variant='h4'>{data.data.rateUsd}</Typography>
      {/* Display other coin details, history, market data */}
    </Container>
  );
  }

  
};

export default CoinDetailsPage;
