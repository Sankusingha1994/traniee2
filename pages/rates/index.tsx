// pages/rate.tsx
import React, { useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { Typography, Button, Modal, Box, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import Wrapper from '@/Layout/wraper';

const style = {
     position: 'absolute' as 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 24,
     pt: 2,
     px: 4,
     pb: 3,
   };



const fetchRates = async () => {
  const response = await axios.get('https://api.coincap.io/v2/rates');
  return response.data;
};

const RatePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey:['rates'], 
    queryFn:fetchRates});
  const [selectedRate, setSelectedRate] = useState<any>(null);

  const handleOpenModal = (rate: any) => {
    setSelectedRate(rate);
  };

  const handleCloseModal = () => {
    setSelectedRate(null);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching rates</Typography>;
  
  // console.log("Details",rates);
  
  

  return (
    <Wrapper>
      <Typography variant="h4">Rate List</Typography>
      <Container>
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
           {data.data.map((coin: any) => (
             <TableRow key={coin.id}>
               <TableCell>
               {coin.id}
               </TableCell>
               <TableCell>
               {coin.symbol}
               </TableCell>
               <TableCell>
               {coin.currencySymbol}
               </TableCell>
               <TableCell>
               {coin.rateUsd}
               </TableCell>
               <TableCell>
               {coin.type}
               </TableCell>
               <TableCell>
               <Button onClick={() => handleOpenModal(coin)}>View Details</Button>
               </TableCell>
             </TableRow>
             
          ))}
         </TableBody>
       </Table>
       </TableContainer>
      <Modal open={!!selectedRate} onClose={handleCloseModal}>
        <Box sx={{...style,width:500,background:"green"}}>
          <Typography variant="h4">Coin Id : {selectedRate?.id}</Typography>
          <Typography variant="h4">Symbol : {selectedRate?.symbol}</Typography>
          <Typography variant="h4">CurrencySymbol : {selectedRate?.currencySymbol}</Typography>
          <Typography variant="h4">RateUsd : {selectedRate?.rateUsd}</Typography>
          {/* Add other rate details here */}
          <Button onClick={handleCloseModal} sx={{background:"yellow"}}>Close</Button>
        </Box>
      </Modal>
      </Container>
    </Wrapper>
  );
};

export default RatePage;

