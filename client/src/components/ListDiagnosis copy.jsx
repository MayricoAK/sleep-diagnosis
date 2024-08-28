// src/components/ListDiagnosis.jsx
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ListDiagnosis = ({ rows, columns, isLoading }) => {
  const theme = useTheme();

  return (
    <Box
      flex="1"
      minWidth="500px"
      backgroundColor={theme.palette.background.alt}
      p="1.5rem"
      borderRadius="0.55rem"
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h6" gutterBottom>
        Diagnosis List
      </Typography>
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
