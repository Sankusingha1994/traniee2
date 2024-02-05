// pages/coin/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import Wrapper from '@/Layout/wraper';



const CoinDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchCoinDetails = async (id: string) => {
    const response = await axios.get(`https://api.coincap.io/v2/exchanges/${id}`);
    return response.data;
  };

  if(id){
    const { data, isLoading, isError } = useQuery(['coin', id], () => fetchCoinDetails(id as string));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching coin details</Typography>;
  console.log(data)

  return (
    <Wrapper>
    <Container sx={{width:"50%", textAlign:"center",background:"blue",color:"white"}}>
      <Typography variant='h4'>Coin Details</Typography>
     <Typography>Rank : {data.data.rank}</Typography>
      <Typography>Name : {data.data.name}</Typography>
      <Typography>PercentTotalVolume : {data.data.percentTotalVolume}</Typography>
      <Typography>VolumeUsd : {data.data.volumeUsd}</Typography>
      <Typography>TradingPairs : {data.data.tradingPairs}</Typography>
      <Typography>ExchangeUrl : {data.data.exchangeUrl}</Typography>
      </Container>
      </Wrapper>
  );
  }

  
};

export default CoinDetailsPage;
