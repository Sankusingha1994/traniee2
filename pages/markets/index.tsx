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
      <TableContainer sx={{border:"2px solid red",borderRadius:"20px"}}>
       <Table sx={{background:"yellow"}}>
       <TableHead >
          <TableRow>
<TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>Id</TableCell>
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>Symbol</TableCell>
           <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>CurrencySymbol</TableCell>
           <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>RateUsd</TableCell>
           <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>Type</TableCell>
             </TableRow>
        </TableHead>
        <TableBody>
           {data.data.map((market: any) => (
             <TableRow key={market.id}>
               <TableCell>
               {market.rank}
               </TableCell>
               <TableCell>
               {market.exchangeId}
               </TableCell>
               <TableCell>
               {market.quoteSymbol}
               </TableCell>
               <TableCell>
               {market.baseId}
               </TableCell>
               <TableCell>
               {market.priceQuote}
               </TableCell>
             </TableRow>
             
          ))}
         </TableBody>
       </Table>
       </TableContainer>
      {/* <List>
        {data.data.map((market: any) => (
          <ListItem key={market.id}>
            <ListItemText primary={market.rank} />
            <ListItemText primary={market.exchangeId}/>
            <ListItemText primary={market.quoteSymbol}/>
            <ListItemText primary={market.baseId}/>
            <ListItemText primary={market.priceQuote} />
          </ListItem>
        ))}
      </List> */}
    </Container>
    </Wrapper>
  );
};

export default MarketsPage;
