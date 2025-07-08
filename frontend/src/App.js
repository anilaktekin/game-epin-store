import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Keys from './pages/Keys';
import WheelOfFortune from './pages/WheelOfFortune';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Subscription from './pages/Subscription';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF',
      light: '#9C88FF',
      dark: '#4B42CC',
    },
    secondary: {
      main: '#FF6B6B',
      light: '#FF9999',
      dark: '#E55555',
    },
    background: {
      default: '#0F0F23',
      paper: '#1A1A2E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          border: '1px solid rgba(108, 99, 255, 0.2)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/keys" element={<Keys />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/wheel" element={<WheelOfFortune />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
