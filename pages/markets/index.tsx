// pages/markets.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { Typography, List, ListItem, ListItemText, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import Wrapper from '@/Layout/wraper';

const fetchMarkets = async () => {
  const response = await axios.get("https://api.coincap.io/v2/markets");
  return response.data;
};

const MarketsPage = () => {
  const { data, isLoading, isError } = useQuery('markets', fetchMarkets);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching markets</Typography>;

  // console.log(markets)

  return (
    <Wrapper>
    <Container>
      <Typography variant="h4">Markets List</Typography>
      <List>
        {data.data.map((market: any) => (
          <ListItem key={market.id}>
            <ListItemText primary={market.rank} />
            <ListItemText primary={market.exchangeId}/>
            <ListItemText primary={market.quoteSymbol}/>
            <ListItemText primary={market.baseId}/>
            <ListItemText primary={market.priceQuote} />
          </ListItem>
        ))}
      </List>
    </Container>
    </Wrapper>
  );
};

export default MarketsPage;
