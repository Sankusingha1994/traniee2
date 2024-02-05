// pages/index.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Container } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import Wrapper from '@/Layout/wraper';



const fetchCoins = async () => {
  const response = await axios.get('https://api.coincap.io/v2/assets');
  return response.data.data;
};

const HomePage = () => {
  const { data: coins, isLoading, isError } = useQuery('coins', fetchCoins);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching coins</Typography>;

  return (
    <Wrapper>
      <Typography sx={{textAlign:"center", fontSize:"25px", color:"red",marginBottom:"20px"}}>Welcome To Crypto</Typography>
      <Container >
    <TableContainer sx={{border:"2px solid red",borderRadius:"20px"}}>
      <Table sx={{background:"yellow"}}>
        <TableHead >
          <TableRow >
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>Coin Name</TableCell>
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>Price</TableCell>
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>Change</TableCell>
            <TableCell sx={{color:"red", fontSize:"20px", textAlign:"center"}}>24h Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin: any) => (
            <TableRow key={coin.id}>
              <TableCell>
                <Link href={`Assets/coin/${coin.id}`}>
                  {coin.symbol} {coin.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`Assets/coin/${coin.id}`}>
                  {coin.priceUsd}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`Assets/coin/${coin.id}`}>
                  {coin.changePercent24Hr}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`Assets/coin/${coin.id}`}>
                  {coin.volumeUsd24Hr}
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

export default HomePage;
