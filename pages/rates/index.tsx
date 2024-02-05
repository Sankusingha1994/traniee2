// pages/rate.tsx
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Typography, Button, Modal, Box, Container } from '@mui/material';
import axios from 'axios';

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
    <div>
      <Typography variant="h4">Rate List</Typography>
      <Container>
      {data.data.map((rate: any) => (
        <div key={rate.id}>
          <Typography>{rate.id}</Typography>
          <Typography>{rate.symbol}</Typography>
          <Typography>{rate.currencySymbol}</Typography>
          <Typography>{rate.type}</Typography>
          <Typography>{rate.rateUsd}</Typography>
          <Button onClick={() => handleOpenModal(rate)}>View Details</Button>
        </div>
      ))}
      <Modal open={!!selectedRate} onClose={handleCloseModal}>
        <Box>
          <Typography variant="h4">{selectedRate?.name}</Typography>
          {/* Add other rate details here */}
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
      </Container>
    </div>
  );
};

export default RatePage;
