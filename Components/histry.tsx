// pages/coin/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Container, List, Typography } from '@mui/material';
import axios from 'axios';



const CoinHistryPage = () => {
  const router = useRouter();
  const { histry } = router.query;

  const fetchCoinHistry = async ( histry: string) => {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${histry}/history?interval=d1`);
    return response.data?.data;
  };

  if( histry){
    const { data, isLoading, isError } = useQuery(['coin',  histry], () => fetchCoinHistry( histry as string));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching coin details</Typography>;
  console.log(data.data)

  return (
    <Container>
     <Typography>Coin Histry</Typography>
     <List>
       {
        data.data.map((history: any)=>(
         <Typography variant="h4">{history.priceUsd}</Typography>
        ))
       }
     </List>
      
      {/* Display other coin details, history, market data */}
    </Container>
  );
  }

  
};

export default CoinHistryPage;
