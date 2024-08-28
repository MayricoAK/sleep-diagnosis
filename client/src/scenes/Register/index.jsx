import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { useTheme, Link } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { usePostRegisterMutation } from 'state/api';
import Copyright from 'components/Copyright';
import 'dayjs/locale/en-gb';

export default function Register() {
  const theme = useTheme();
  const [birthDate, setBirthDate] = useState(dayjs());
  const [gender, setGender] = useState('');
  const [postRegister] = usePostRegisterMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const newUser = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      gender,
      birthDate: birthDate.toISOString().split('T')[0],
    };
  
    try {
      const response = await postRegister(newUser).unwrap();
      console.log('User registered successfully:', response);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Container component="main" maxWidth="xs">
        <Box
          p={4}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            border: `3px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <FlexBetween color={theme.palette.secondary.main}>
            <Box display="flex" alignItems="center" gap="0.5rem">
              <Typography component="h1" variant="h5">
                Register
              </Typography>
            </Box>
          </FlexBetween>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="password"
                  name="password"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="gender"
                  name="gender"
                  required
                  fullWidth
                  select
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label="Birth Date"
                  value={birthDate}
                  onChange={(newValue) => setBirthDate(newValue)}
                  slotProps={{
                    textField: { fullWidth: true, required: true, id: 'birthDate', name: 'birthDate' }
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" color="inherit">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </LocalizationProvider>
  );
}