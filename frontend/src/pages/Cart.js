import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  Divider,
  IconButton,
  Alert
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  CreditCard,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Cart context'ten gelebilir, şimdilik localStorage kullanıyoruz
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalAmount);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotal(0);
  };

  const proceedToCheckout = () => {
    // Checkout sayfasına yönlendirme
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}
        >
          Ana Sayfaya Dön
        </Button>

        <Typography 
          variant="h3" 
          sx={{ 
            color: 'white', 
            mb: 4, 
            textAlign: 'center',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 2 
          }}
        >
          <ShoppingCart />
          Sepetim
        </Typography>

        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingCart sx={{ fontSize: 100, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            Sepetiniz boş
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', mb: 4 }}>
            Oyun e-pinleri ve keyleri ekleyerek alışverişe başlayın
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{
              backgroundColor: '#6C63FF',
              mr: 2
            }}
          >
            Oyun E-Pinleri
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/keys')}
            sx={{
              borderColor: '#FFC107',
              color: '#FFC107'
            }}
          >
            Oyun Keyleri
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}
      >
        Ana Sayfaya Dön
      </Button>

      <Typography 
        variant="h3" 
        sx={{ 
          color: 'white', 
          mb: 4, 
          textAlign: 'center',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2 
        }}
      >
        <ShoppingCart />
        Sepetim
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
              border: '1px solid rgba(108, 99, 255, 0.3)',
              borderRadius: '15px',
              p: 3
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
              Sepet Öğeleri ({cartItems.length})
            </Typography>
            
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  mb: 2,
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${item.color}30`,
                  borderRadius: '10px'
                }}
              >
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {item.gameName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: item.color }}>
                        {item.amount}
                      </Typography>
                      {item.bonus && (
                        <Chip
                          label={item.bonus}
                          size="small"
                          sx={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            mt: 1
                          }}
                        />
                      )}
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <IconButton 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          sx={{ color: '#6C63FF' }}
                        >
                          <Remove />
                        </IconButton>
                        <Typography sx={{ color: 'white', minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          sx={{ color: '#6C63FF' }}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={2}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#6C63FF', fontWeight: 'bold' }}>
                          ₺{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        {item.originalPrice && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255,255,255,0.5)', 
                              textDecoration: 'line-through' 
                            }}
                          >
                            ₺{(item.originalPrice * item.quantity).toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={1}>
                      <IconButton 
                        onClick={() => removeFromCart(item.id)}
                        sx={{ color: '#FF6B6B' }}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
        
        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
              border: '1px solid rgba(108, 99, 255, 0.3)',
              borderRadius: '15px',
              p: 3,
              position: 'sticky',
              top: 20
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
              Sipariş Özeti
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Ara Toplam:
                </Typography>
                <Typography sx={{ color: 'white' }}>
                  ₺{total.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  KDV (%20):
                </Typography>
                <Typography sx={{ color: 'white' }}>
                  ₺{(total * 0.2).toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Toplam:
                </Typography>
                <Typography variant="h6" sx={{ color: '#6C63FF', fontWeight: 'bold' }}>
                  ₺{(total * 1.2).toFixed(2)}
                </Typography>
              </Box>
            </Box>
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<CreditCard />}
              onClick={proceedToCheckout}
              sx={{
                background: 'linear-gradient(45deg, #6C63FF, #FF6B6B)',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                mb: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(108, 99, 255, 0.3)',
                }
              }}
            >
              Ödeme Yap
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/products')}
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  borderColor: '#6C63FF',
                  color: '#6C63FF'
                }
              }}
            >
              Alışverişe Devam Et
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
