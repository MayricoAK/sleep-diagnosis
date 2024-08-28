// src/components/ListDiagnosis.jsx
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const ListDiagnosis = ({ rows, columns, isLoading }) => {
  const theme = useTheme();

  return (
    <Box
      flex="1"
      minWidth="500px"
      maxWidth="1500px" // Adjust as necessary
      backgroundColor={theme.palette.background.alt}
      p="1.5rem"
      borderRadius="0.55rem"
      sx={{
        px: '25px', // Add padding-left and padding-right
        '@media (max-width:600px)': {
          minWidth: 'auto', // Adjust width for smaller screens if needed
        },
      }}
    >
        <FlexBetween color={theme.palette.secondary.main}>
          <Box display="flex" gap="0.5rem">
            <Typography component="h1" variant="h5">
              Diagnosis List
            </Typography>
          </Box>
        </FlexBetween> <br />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        loading={isLoading}
        autoHeight
      />
    </Box>
  );
};

export default ListDiagnosis;