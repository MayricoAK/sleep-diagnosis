import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Avatar, MenuItem } from '@mui/material';
import { usePostDiagnosisMutation } from 'state/api';
import { formatDate } from 'utils/utils';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography, Container } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import useTheme from '@mui/material/styles/useTheme';

const FormDiagnosis = ({ onSuccess }) => {
  // Initialize diagnosisDate with today's date
  const today = dayjs().format('DD-MM-YYYY');
  const [diagnosisData, setDiagnosisData] = useState({
    sleepDuration: '',
    qualityOfSleep: '',
    physicalActivity: '',
    stressLevel: '',
    bloodPressure: '',
    heartRate: '',
    dailySteps: '',
    diagnosisDate: today,
    height: '',
    weight: '',
    gender: '',
    birthDate: null,
  });

  const theme = useTheme();
  const [postDiagnosis] = usePostDiagnosisMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiagnosisData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setDiagnosisData((prevData) => ({
      ...prevData,
      diagnosisDate: date ? date.format('DD-MM-YYYY') : today,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format the diagnosisDate before sending
    const formattedData = {
      ...diagnosisData,
      diagnosisDate: formatDate(diagnosisData.diagnosisDate),
    };

    try {
      await postDiagnosis(formattedData).unwrap();
      setDiagnosisData({
        sleepDuration: '',
        qualityOfSleep: '',
        physicalActivity: '',
        stressLevel: '',
        bloodPressure: '',
        heartRate: '',
        dailySteps: '',
        diagnosisDate: today,
        height: '',
        weight: '',
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to add diagnosis:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="xs">
        <Box
          p={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <FlexBetween color={theme.palette.secondary.main}>
            <Box display="flex" alignItems="center" gap="0.5rem">
              <Typography component="h1" variant="h5">
                Form Diagnosis
              </Typography>
            </Box>
          </FlexBetween>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="sleepDuration"
                  name="sleepDuration"
                  label="Sleep Duration (hours)"
                  type="number"
                  fullWidth
                  required
                  value={diagnosisData.sleepDuration}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="qualityOfSleep"
                  name="qualityOfSleep"
                  label="Quality of Sleep (1-10)"
                  type="number"
                  fullWidth
                  required
                  value={diagnosisData.qualityOfSleep}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="physicalActivity"
                  name="physicalActivity"
                  label="Physical Activity (hours)"
                  type="number"
                  fullWidth
                  required
                  value={diagnosisData.physicalActivity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="stressLevel"
                  name="stressLevel"
                  label="Stress Level (1-10)"
                  type="number"
                  fullWidth
                  required
                  value={diagnosisData.stressLevel}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="bloodPressure"
                  name="bloodPressure"
                  required
                  fullWidth
                  select
                  label="Blood Pressure"
                  value={diagnosisData.bloodPressure}
                  onChange={handleChange}
                >
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Stage 1">Stage 1</MenuItem>
                  <MenuItem value="Stage 2">Stage 2</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="heartRate"
                  name="heartRate"
                  label="Heart Rate (bpm)"
                  type="number"
                  fullWidth
                  required
                  value={diagnosisData.heartRate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="dailySteps"
                  name="dailySteps"
                  label="Daily Steps"
                  type="number"
                  fullWidth
                  required
                  value={diagnosisData.dailySteps}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="height"
                  name="height"
                  label="Height (cm)"
                  type="number"
                  fullWidth
                  required
                  value={diagnosisData.height}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="weight"
                  name="weight"
                  label="Weight (kg)"
                  type="number"
                  fullWidth
                  required
                  value={diagnosisData.weight}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label="Diagnosis Date"
                  value={dayjs(diagnosisData.diagnosisDate, 'DD-MM-YYYY')}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: { fullWidth: true, required: true, id: 'diagnosisDate', name: 'diagnosisDate' }
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Diagnosis
            </Button>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default FormDiagnosis;