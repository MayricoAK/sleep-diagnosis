import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetDetailDiagnosisQuery } from 'state/api';
import Header from 'components/Header';

const DetailDiagnosis = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetDetailDiagnosisQuery(id);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading diagnosis details</Typography>;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DIAGNOSIS DETAILS" subtitle="Detailed information about the diagnosis" />
      <Box mt="20px">
        <Typography variant="h6">Name: {data.name}</Typography>
        <Typography variant="body1">Gender: {data.gender}</Typography>
        <Typography variant="body1">Age: {data.age}</Typography>
        <Typography variant="body1">Height: {data.height} cm</Typography>
        <Typography variant="body1">Weight: {data.weight} kg</Typography>
        <Typography variant="body1">BMI Category: {data.BMIcategory}</Typography>
        <Typography variant="body1">Sleep Duration: {data.sleepDuration} hours</Typography>
        <Typography variant="body1">Quality of Sleep: {data.qualityOfSleep}/10</Typography>
        <Typography variant="body1">Physical Activity: {data.physicalActivityInMinute} minutes</Typography>
        <Typography variant="body1">Stress Level: {data.stressLevel}/10</Typography>
        <Typography variant="body1">Blood Pressure: {data.bloodPressure}</Typography>
        <Typography variant="body1">Heart Rate: {data.heartRate} bpm</Typography>
        <Typography variant="body1">Daily Steps: {data.dailySteps}</Typography>
        <Typography variant="body1">Sleep Disorder: {data.sleepDisorder}</Typography>
        <Typography variant="body1">Solution: {data.solution}</Typography>
        <Typography variant="body2">Diagnosis Date: {new Date(data.diagnosisDate).toLocaleDateString()}</Typography>
        <Typography variant="body2">Created At: {new Date(data.createdAt).toLocaleDateString()}</Typography>
      </Box>
    </Box>
  );
};

export default DetailDiagnosis;