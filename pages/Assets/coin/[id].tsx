// pages/coin/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import CoinHistryPage from '@/Components/histry';
// import MarketsPage from '@/pages/markets';
import CoinMarketPage from '@/Components/markets';
import Wrapper from '@/Layout/wraper';



const CoinDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchCoinDetails = async (id: string) => {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
    return response.data;
  };

  if(id){
    const { data, isLoading, isError } = useQuery(['coin', id], () => fetchCoinDetails(id as string));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching coin details</Typography>;
  // console.log("history : ",data)

  return (
    <Wrapper>
    <Container sx={{width:"50%", textAlign:"center",background:"blue",color:"white"}}>
      <Typography variant='h4'>Coin Details</Typography>
     <Typography>Name : {data.data.name}</Typography>
      <Typography>Supply : {data.data.supply}</Typography>
      <Typography>MaxSupply : {data.data.maxSupply}</Typography>
      <Typography>MarketCapUsd : {data.data.marketCapUsd}</Typography>
      </Container>
      <Container>
      {/* Display other coin details, history, market data */}
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CoinHistryPage/>
        </Grid>
        <Grid item xs={6}>
          <CoinMarketPage/>
        </Grid>
        </Grid>
        </Box>
    </Container>
    </Wrapper>
  );
  }

  
};

export default CoinDetailsPage;
