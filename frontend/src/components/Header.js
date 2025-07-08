import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Container,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  SportsEsports,
  Casino,
  Storefront,
  AccountBalanceWallet,
  Star,
  Key,
  Add
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [balanceDialog, setBalanceDialog] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState('');
  const [userBalance, setUserBalance] = useState(150.00);

  // Cart item count güncellemesi
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(totalItems);
    };

    updateCartCount();
    
    // Custom event listener for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    // Storage event listener for cross-tab updates
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Balance güncellemesi
  useEffect(() => {
    const updateBalance = () => {
      const savedBalance = localStorage.getItem('userBalance');
      if (savedBalance) {
        setUserBalance(parseFloat(savedBalance));
      }
    };

    updateBalance();
    
    // Balance update event listener
    window.addEventListener('balanceUpdated', updateBalance);
    window.addEventListener('storage', updateBalance);
    
    return () => {
      window.removeEventListener('balanceUpdated', updateBalance);
      window.removeEventListener('storage', updateBalance);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loadBalance = () => {
    if (!balanceAmount || parseFloat(balanceAmount) <= 0) return;

    const amount = parseFloat(balanceAmount);
    const newBalance = userBalance + amount;
    
    // Update local balance
    setUserBalance(newBalance);
    localStorage.setItem('userBalance', newBalance.toString());
    
    // Also add to cart for payment processing
    const cartItem = {
      id: `balance-${Date.now()}`,
      gameName: 'Bakiye Yüklemesi',
      amount: `₺${balanceAmount} Bakiye`,
      price: amount,
      originalPrice: null,
      bonus: null,
      color: '#4CAF50',
      quantity: 1,
      type: 'balance'
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    setBalanceDialog(false);
    setBalanceAmount('');
    
    // Dispatch events
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('balanceUpdated'));
  };

  // Mock user data - replace with real auth later
  const user = {
    isAuthenticated: true,
    username: 'GameUser',
    balance: userBalance,
    isPremium: true,
    premiumPlan: 'Premium Plan'
  };

  const navItems = [
    { title: 'Ana Sayfa', path: '/', icon: <Storefront /> },
    { title: 'Oyun E-Pinleri', path: '/products', icon: <SportsEsports /> },
    { title: 'Oyun Keyleri', path: '/keys', icon: <Key /> },
    { title: 'Premium Üyelik', path: '/subscription', icon: <Star /> },
    { title: 'Şans Çarkı', path: '/wheel', icon: <Casino /> },
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(108, 99, 255, 0.2)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SportsEsports sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'linear-gradient(45deg, #6C63FF, #FF6B6B)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                BroPin
              </Typography>
            </Box>

            {/* Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      background: 'rgba(108, 99, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>

            {/* User Menu & Cart */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {user.isAuthenticated && (
                <>
                  {/* Current Balance Display */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    mr: 1,
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    background: user.isPremium 
                      ? 'linear-gradient(45deg, #FFD700, #FFA500)' 
                      : 'rgba(108, 99, 255, 0.1)',
                    border: user.isPremium 
                      ? '1px solid rgba(255, 215, 0, 0.3)' 
                      : '1px solid rgba(108, 99, 255, 0.3)'
                  }}>
                    <AccountBalanceWallet sx={{ 
                      color: user.isPremium ? '#000' : theme.palette.primary.main 
                    }} />
                    <Typography variant="body2" sx={{ 
                      color: user.isPremium ? '#000' : 'white', 
                      fontWeight: 600 
                    }}>
                      {user.balance.toFixed(2)} TL
                    </Typography>
                    {user.isPremium && (
                      <Star sx={{ color: '#000', fontSize: 16 }} />
                    )}
                  </Box>

                  {/* Balance Loading Button */}
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setBalanceDialog(true)}
                    sx={{
                      mr: 1,
                      borderColor: '#4CAF50',
                      color: '#4CAF50',
                      fontSize: '0.75rem',
                      py: 0.5,
                      px: 1.5,
                      minWidth: 'auto',
                      '&:hover': {
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)'
                      }
                    }}
                  >
                    Yükle
                  </Button>
                </>
              )}

              {/* Cart */}
              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  color: 'white',
                  '&:hover': {
                    background: 'rgba(255, 107, 107, 0.1)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Badge badgeContent={cartItemCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {/* User Menu */}
              {user.isAuthenticated ? (
                <>
                  <IconButton
                    size="large"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{
                      '&:hover': {
                        background: 'rgba(108, 99, 255, 0.1)',
                      }
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                      '& .MuiPaper-root': {
                        backgroundColor: '#1A1A2E',
                        border: '1px solid rgba(108, 99, 255, 0.3)',
                        mt: 1
                      }
                    }}
                  >
                    <MenuItem
                      onClick={() => { handleClose(); navigate('/profile'); }}
                      sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(108, 99, 255, 0.1)' } }}
                    >
                      Profil
                    </MenuItem>
                    <MenuItem
                      onClick={() => { handleClose(); navigate('/subscription'); }}
                      sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(108, 99, 255, 0.1)' } }}
                    >
                      Premium Üyelik
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 107, 107, 0.1)' } }}
                    >
                      Çıkış Yap
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #6C63FF, #FF6B6B)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF6B6B, #6C63FF)',
                    }
                  }}
                >
                  Giriş Yap
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Balance Loading Dialog */}
      <Dialog 
        open={balanceDialog} 
        onClose={() => setBalanceDialog(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
            border: '2px solid rgba(76, 175, 80, 0.3)',
            borderRadius: '15px'
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', textAlign: 'center' }}>
          💰 Bakiye Yükle
        </DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <AccountBalanceWallet sx={{ color: '#4CAF50', fontSize: 60, mb: 2 }} />
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
              Mevcut Bakiye: <strong style={{ color: '#4CAF50' }}>₺{userBalance.toFixed(2)}</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
              Hesabınıza yüklemek istediğiniz tutarı girin
            </Typography>
            <TextField
              fullWidth
              label="Tutar (₺)"
              value={balanceAmount}
              onChange={(e) => setBalanceAmount(e.target.value)}
              type="number"
              inputProps={{ min: 1, step: 0.01 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(76, 175, 80, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-focused': {
                    color: '#4CAF50',
                  },
                },
              }}
            />
            {balanceAmount && parseFloat(balanceAmount) > 0 && (
              <Typography variant="body2" sx={{ color: '#4CAF50', mt: 1 }}>
                Yeni Bakiye: ₺{(userBalance + parseFloat(balanceAmount)).toFixed(2)}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            onClick={() => setBalanceDialog(false)}
            sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
            İptal
          </Button>
          <Button 
            onClick={loadBalance}
            variant="contained"
            disabled={!balanceAmount || parseFloat(balanceAmount) <= 0}
            sx={{
              background: 'linear-gradient(45deg, #4CAF50, #45A049)',
              color: 'white',
              fontWeight: 'bold',
              px: 4
            }}
          >
            Bakiye Yükle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header; 