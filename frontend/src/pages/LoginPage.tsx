'use client'

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Container, 
  Box,
  Alert,
  Snackbar,
  styled
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const BackgroundBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url("https://www.informatik.tu-darmstadt.de/media/informatik/fb20_studium/studienfotos/tu_darmstadt_ulb_04_web_1300x0.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(8px)',
  transform: 'scale(1.1)',
  zIndex: -1,
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(4),
}));

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/success');
      } else {
        setSnackbarMessage('Invalid username or password');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <BackgroundBox />
      <ContentBox>
        <Container component="main" maxWidth="xs">
          <Card sx={{ mt: 3, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <LockOutlinedIcon sx={{ m: 1, bgcolor: 'secondary.main', color: 'white', p: 1, borderRadius: '50%' }} />
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Forgot password?
              </Button>
              <Button size="small" color="primary">
                Don't have an account? Sign Up
              </Button>
            </CardActions>
          </Card>
        </Container>
      </ContentBox>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

