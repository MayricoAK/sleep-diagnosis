import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme, IconButton } from '@mui/material';
import { useGetDiagnosisQuery, useDeleteDiagnosisMutation } from 'state/api';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';
import { DeleteRounded, InfoRounded, AddRounded, CloseRounded } from '@mui/icons-material';
import FormDiagnosis from 'components/FormDiagnosis';
import ListDiagnosis from 'components/ListDiagnosis';

const Home = () => {
  const { data, isLoading, refetch } = useGetDiagnosisQuery();
  const [deleteDiagnosis] = useDeleteDiagnosisMutation();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (Array.isArray(data)) {
      const processedRows = data.map((diagnosis) => ({
        id: diagnosis._id,
        ...diagnosis, // Dates are already formatted by the backend
      }));
      setRows(processedRows);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await deleteDiagnosis(id).unwrap();
      await refetch();
    } catch (error) {
      console.error('Failed to delete diagnosis:', error);
    }
  };

  const handleAddDiagnosisClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const columns = [
    { field: 'diagnosisDate', headerName: 'Date', flex: 1 },
    { field: 'sleepDisorder', headerName: 'Sleep Disorder', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            color={theme.palette.secondary.light}
            onClick={() => navigate(`/diagnosis/${params.row.id}`)}
          >
            <InfoRounded />
          </IconButton>
          <IconButton
            color={theme.palette.secondary.light}
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteRounded />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
          onClick={handleAddDiagnosisClick}
        >
          {isFormVisible ? <CloseRounded sx={{ mr: '10px' }} /> : <AddRounded sx={{ mr: '10px' }} /> }
          {isFormVisible ? 'Close Form' : 'Add New Diagnosis'}
        </Button>
      </FlexBetween>

      <Box
        mt="20px"
        display="flex"
        flexDirection="column"
        gap="20px"
        sx={{ 
          '@media (min-width:600px)': { 
            flexDirection: 'row'
          } 
        }}
      >
        {/* List Diagnosis */}
        <ListDiagnosis rows={rows} columns={columns} isLoading={isLoading} />

        {/* Form Diagnosis */}
        {isFormVisible && (
          <FormDiagnosis onSuccess={() => { refetch(); setIsFormVisible(false); }} />
        )}
      </Box>
    </Box>
  );
};

export default Home;