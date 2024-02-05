// pages/exchanges.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { Typography, List, ListItem, ListItemText, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import Wrapper from '@/Layout/wraper';

const fetchExchanges = async () => {
  const response = await axios.get('https://api.coincap.io/v2/exchanges');
  return response.data;
};

const ExchangesPage = () => {
  const { data, isLoading, isError } = useQuery('exchanges', fetchExchanges);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching exchanges</Typography>;

  console.log(data.data);
  

  return (
    <Wrapper>
      <Typography variant="h4" sx={{textAlign:"center",marginBottom:"20px"}}>Exchanges List</Typography>
      <Container >
    <TableContainer sx={{border:"2px solid red",borderRadius:"20px"}}>
      <Table sx={{background:"yellow"}}>
        <TableHead >
          <TableRow>
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>Rank</TableCell>
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>Name</TableCell>
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>percentTotalVolume</TableCell>
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>volumeUsd</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((exchange: any) => (
            <TableRow key={exchange.exchangeId}>
              <TableCell>
                <Link href={`/exchanges/${exchange.exchangeId}`}>
                {exchange.rank}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/exchanges/${exchange.exchangeId}`}>
                {exchange.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/exchanges/${exchange.exchangeId}`}>
                {exchange.percentTotalVolume}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/exchanges/${exchange.exchangeId}`}>
                {exchange.volumeUsd}
                </Link>
              </TableCell>
              {/* Add more cells for other coin details */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </Wrapper>
  );
};

export default ExchangesPage;
