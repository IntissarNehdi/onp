import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';
import ConsentForm from './components/ConsentFormsFolder/ConsentForm';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/consent" element={<ConsentForm selectedInput1={'in1'} selectedInput2={'in2'} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
