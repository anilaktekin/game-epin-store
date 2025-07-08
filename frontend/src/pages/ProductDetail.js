import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  TextField,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  ShoppingCart,
  Star,
  Verified,
  Speed,
  Security,
  Support,
  NavigateNext,
  SportsEsports,
  AccountBalanceWallet,
  Add
} from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [purchaseDialog, setPurchaseDialog] = useState(false);
  const [balanceDialog, setBalanceDialog] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState('');

  // Oyun verileri ve e-pin paketleri
  const gameData = {
    'valorant': {
      name: 'Valorant',
      currency: 'VP (Valorant Points)',
      description: 'Riot Games\'in popüler tactical FPS oyunu için VP satın alın. Karakterler, silah kaplamaları ve battle pass için kullanabilirsiniz.',
      image: '/images/games/valorant.jpg',
      color: '#ff4655',
      category: 'FPS',
      totalSales: '50K+',
      packages: [
        { id: 1, amount: '475 VP', price: 39.99, originalPrice: null, popular: false, bonus: null },
        { id: 2, amount: '1000 VP', price: 79.99, originalPrice: 89.99, popular: true, bonus: '+100 VP Bonus' },
        { id: 3, amount: '2050 VP', price: 159.99, originalPrice: 179.99, popular: false, bonus: '+200 VP Bonus' },
        { id: 4, amount: '3650 VP', price: 279.99, originalPrice: 319.99, popular: false, bonus: '+400 VP Bonus' },
        { id: 5, amount: '5350 VP', price: 419.99, originalPrice: 479.99, popular: false, bonus: '+650 VP Bonus' },
        { id: 6, amount: '11000 VP', price: 839.99, originalPrice: 959.99, popular: false, bonus: '+1500 VP Bonus' }
      ]
    },
    'fortnite': {
      name: 'Fortnite',
      currency: 'V-Papel',
      description: 'Epic Games\'in battle royale oyunu için V-Papel. Kostümler, emote\'lar ve battle pass satın alabilirsiniz.',
      image: '/images/games/fortnite.jpg',
      color: '#00d4ff',
      category: 'Battle Royale',
      totalSales: '75K+',
      packages: [
        { id: 1, amount: '1000 V-Papel', price: 69.99, originalPrice: null, popular: false, bonus: null },
        { id: 2, amount: '2800 V-Papel', price: 189.99, originalPrice: 209.99, popular: true, bonus: '+300 V-Papel Bonus' },
        { id: 3, amount: '5000 V-Papel', price: 329.99, originalPrice: 369.99, popular: false, bonus: '+600 V-Papel Bonus' },
        { id: 4, amount: '13500 V-Papel', price: 839.99, originalPrice: 959.99, popular: false, bonus: '+1500 V-Papel Bonus' }
      ]
    },
    'pubg-mobile': {
      name: 'PUBG Mobile',
      currency: 'UC (Unknown Cash)',
      description: 'Tencent\'in mobil battle royale oyunu için UC. Kostümler, silah kaplamaları ve özel eşyalar için kullanabilirsiniz.',
      image: '/images/games/pubg-mobile.jpg',
      color: '#ff9500',
      category: 'Mobile BR',
      totalSales: '100K+',
      packages: [
        { id: 1, amount: '60 UC', price: 29.99, originalPrice: null, popular: false, bonus: null },
        { id: 2, amount: '325 UC', price: 149.99, originalPrice: 169.99, popular: true, bonus: '+25 UC Bonus' },
        { id: 3, amount: '660 UC', price: 299.99, originalPrice: 339.99, popular: false, bonus: '+60 UC Bonus' },
        { id: 4, amount: '1800 UC', price: 799.99, originalPrice: 899.99, popular: false, bonus: '+200 UC Bonus' },
        { id: 5, amount: '3850 UC', price: 1599.99, originalPrice: 1799.99, popular: false, bonus: '+450 UC Bonus' }
      ]
    },
    'mobile-legends': {
      name: 'Mobile Legends',
      currency: 'Elmas',
      description: 'Moonton\'un MOBA oyunu için elmas. Karakterler, kostümler ve özel yetenekler satın alabilirsiniz.',
      image: '/images/games/mobile-legends.jpg',
      color: '#2196f3',
      category: 'MOBA',
      totalSales: '80K+',
      packages: [
        { id: 1, amount: '86 Elmas', price: 29.99, originalPrice: null, popular: false, bonus: null },
        { id: 2, amount: '172 Elmas', price: 59.99, originalPrice: 69.99, popular: true, bonus: '+14 Elmas Bonus' },
        { id: 3, amount: '429 Elmas', price: 149.99, originalPrice: 169.99, popular: false, bonus: '+43 Elmas Bonus' },
        { id: 4, amount: '878 Elmas', price: 299.99, originalPrice: 339.99, popular: false, bonus: '+100 Elmas Bonus' },
        { id: 5, amount: '2195 Elmas', price: 749.99, originalPrice: 849.99, popular: false, bonus: '+295 Elmas Bonus' }
      ]
    },
    'brawl-stars': {
      name: 'Brawl Stars',
      currency: 'Elmas',
      description: 'Supercell\'in aksiyon oyunu için elmas. Karakterler, kostümler ve battle pass için kullanabilirsiniz.',
      image: '/images/games/brawl-stars.jpg',
      color: '#8e24aa',
      category: 'Action',
      totalSales: '60K+',
      packages: [
        { id: 1, amount: '30 Elmas', price: 19.99, originalPrice: null, popular: false, bonus: null },
        { id: 2, amount: '80 Elmas', price: 49.99, originalPrice: 59.99, popular: true, bonus: '+10 Elmas Bonus' },
        { id: 3, amount: '170 Elmas', price: 99.99, originalPrice: 119.99, popular: false, bonus: '+20 Elmas Bonus' },
        { id: 4, amount: '360 Elmas', price: 199.99, originalPrice: 239.99, popular: false, bonus: '+50 Elmas Bonus' },
        { id: 5, amount: '950 Elmas', price: 499.99, originalPrice: 599.99, popular: false, bonus: '+150 Elmas Bonus' }
      ]
    },
    'league-of-legends': {
      name: 'League of Legends',
      currency: 'RP (Riot Points)',
      description: 'Riot Games\'in MOBA oyunu için RP. Karakterler, kostümler ve ward kaplamaları satın alabilirsiniz.',
      image: '/images/games/league-of-legends.jpg',
      color: '#c89b3c',
      category: 'MOBA',
      totalSales: '200K+',
      packages: [
        { id: 1, amount: '650 RP', price: 49.99, originalPrice: null, popular: false, bonus: null },
        { id: 2, amount: '1380 RP', price: 99.99, originalPrice: 119.99, popular: true, bonus: '+100 RP Bonus' },
        { id: 3, amount: '2800 RP', price: 199.99, originalPrice: 239.99, popular: false, bonus: '+250 RP Bonus' },
        { id: 4, amount: '5000 RP', price: 349.99, originalPrice: 419.99, popular: false, bonus: '+500 RP Bonus' },
        { id: 5, amount: '7200 RP', price: 499.99, originalPrice: 599.99, popular: false, bonus: '+800 RP Bonus' }
      ]
    },
    'free-fire': {
      name: 'Free Fire',
      currency: 'Elmas',
      description: 'Garena\'nın battle royale oyunu için elmas. Karakterler, kostümler ve özel yetenekler için kullanabilirsiniz.',
      image: '/images/games/free-fire.jpg',
      color: '#ff6b35',
      category: 'Mobile BR',
      totalSales: '90K+',
      packages: [
        { id: 1, amount: '100 Elmas', price: 39.99, originalPrice: null, popular: false, bonus: null },
        { id: 2, amount: '210 Elmas', price: 79.99, originalPrice: 89.99, popular: true, bonus: '+20 Elmas Bonus' },
        { id: 3, amount: '520 Elmas', price: 199.99, originalPrice: 229.99, popular: false, bonus: '+60 Elmas Bonus' },
        { id: 4, amount: '1080 Elmas', price: 399.99, originalPrice: 459.99, popular: false, bonus: '+140 Elmas Bonus' },
        { id: 5, amount: '2180 Elmas', price: 799.99, originalPrice: 919.99, popular: false, bonus: '+320 Elmas Bonus' }
      ]
    }
  };

  const game = gameData[id];

  if (!game) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
            Oyun Bulunamadı
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{ backgroundColor: '#6C63FF' }}
          >
            Oyunlara Dön
          </Button>
        </Box>
      </Container>
    );
  }

  const addToCart = () => {
    if (!selectedPackage) return;

    const cartItem = {
      id: `${game.name}-${selectedPackage.id}`,
      gameName: game.name,
      amount: selectedPackage.amount,
      price: selectedPackage.price,
      originalPrice: selectedPackage.originalPrice,
      bonus: selectedPackage.bonus,
      color: game.color,
      quantity: 1,
      type: 'epin'
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    setPurchaseDialog(false);
    setSelectedPackage(null);
    
    // Sepet ikonunu güncelle
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const loadBalance = () => {
    if (!balanceAmount || parseFloat(balanceAmount) <= 0) return;

    const amount = parseFloat(balanceAmount);
    
    // Update user balance
    const currentBalance = parseFloat(localStorage.getItem('userBalance') || '150');
    const newBalance = currentBalance + amount;
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Back Button and Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}
        >
          Oyunlara Dön
        </Button>
        
        <Breadcrumbs separator={<NavigateNext sx={{ color: 'rgba(255,255,255,0.5)' }} />}>
          <Link 
            onClick={() => navigate('/')} 
            sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer', textDecoration: 'none' }}
          >
            Ana Sayfa
          </Link>
          <Link 
            onClick={() => navigate('/products')} 
            sx={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer', textDecoration: 'none' }}
          >
            Oyun E-Pinleri
          </Link>
          <Typography sx={{ color: game.color }}>{game.name}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Game Header */}
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
        <SportsEsports />
        {game.name}
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Game Info */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
              border: `2px solid ${game.color}30`,
              borderRadius: '20px',
              textAlign: 'center',
              height: 'fit-content'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: 250,
                borderRadius: '15px',
                background: `linear-gradient(135deg, ${game.color}20 0%, ${game.color}40 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                fontSize: '80px'
              }}
            >
              <img 
                src={game.image} 
                alt={game.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '15px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '🎮';
                }}
              />
            </Box>
            
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              {game.name}
            </Typography>
            
            <Typography variant="h6" sx={{ color: game.color, fontWeight: 'bold', mb: 2 }}>
              {game.currency}
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, lineHeight: 1.6 }}>
              {game.description}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Chip
                label={game.category}
                sx={{
                  backgroundColor: `${game.color}20`,
                  color: game.color,
                  border: `1px solid ${game.color}40`,
                  fontWeight: 'bold'
                }}
              />
              <Chip
                label={`${game.totalSales} Satış`}
                sx={{
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  color: '#4CAF50',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  fontWeight: 'bold'
                }}
              />
            </Box>
            
            <Alert severity="info" sx={{ 
              backgroundColor: `${game.color}10`,
              border: `1px solid ${game.color}30`,
              color: 'white',
              mb: 3
            }}>
              <Typography variant="body2">
                ⚡ Anında Teslimat Garantisi
              </Typography>
            </Alert>

            {/* Balance Loading Button */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AccountBalanceWallet />}
              onClick={() => setBalanceDialog(true)}
              sx={{
                py: 1.5,
                borderColor: '#4CAF50',
                color: '#4CAF50',
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: '#4CAF50',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)'
                }
              }}
            >
              Bakiye Yükle
            </Button>
          </Paper>
        </Grid>

        {/* Packages */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
              border: '1px solid rgba(108, 99, 255, 0.3)',
              borderRadius: '20px',
              height: 'fit-content'
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
              💎 E-Pin Paketleri
            </Typography>
            
            <Grid container spacing={2}>
              {game.packages.map((pkg) => (
                <Grid item xs={12} key={pkg.id}>
                  <Card
                    onClick={() => setSelectedPackage(pkg)}
                    sx={{
                      cursor: 'pointer',
                      background: selectedPackage?.id === pkg.id 
                        ? `linear-gradient(135deg, ${game.color}20 0%, ${game.color}10 100%)`
                        : 'rgba(255,255,255,0.05)',
                      border: selectedPackage?.id === pkg.id 
                        ? `2px solid ${game.color}`
                        : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        border: `2px solid ${game.color}80`,
                      }
                    }}
                  >
                    {pkg.popular && (
                      <Chip
                        label="Popüler"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          backgroundColor: '#FF6B6B',
                          color: 'white',
                          fontWeight: 'bold',
                          zIndex: 1
                        }}
                      />
                    )}
                    
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                            {pkg.amount}
                          </Typography>
                          {pkg.bonus && (
                            <Chip
                              label={pkg.bonus}
                              size="small"
                              sx={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                          )}
                        </Box>
                        
                        <Box sx={{ textAlign: 'right', ml: 2 }}>
                          <Typography variant="h6" sx={{ color: game.color, fontWeight: 'bold' }}>
                            ₺{pkg.price}
                          </Typography>
                          {pkg.originalPrice && (
                            <>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255,255,255,0.5)', 
                                  textDecoration: 'line-through',
                                  fontSize: '0.8rem'
                                }}
                              >
                                ₺{pkg.originalPrice}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 'bold', display: 'block' }}>
                                %{Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)} İndirim
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={!selectedPackage}
              startIcon={<ShoppingCart />}
              onClick={() => setPurchaseDialog(true)}
              sx={{
                mt: 3,
                py: 2,
                background: selectedPackage 
                  ? `linear-gradient(45deg, ${game.color}, ${game.color}DD)`
                  : 'rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                '&:hover': {
                  background: selectedPackage 
                    ? `linear-gradient(45deg, ${game.color}DD, ${game.color})`
                    : 'rgba(255,255,255,0.1)',
                },
                '&:disabled': {
                  color: 'rgba(255,255,255,0.5)'
                }
              }}
            >
              {selectedPackage ? `₺${selectedPackage.price} - Sepete Ekle` : 'Paket Seçiniz'}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Purchase Confirmation Dialog */}
      <Dialog 
        open={purchaseDialog} 
        onClose={() => setPurchaseDialog(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
            border: `2px solid ${game.color}30`,
            borderRadius: '15px'
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', textAlign: 'center' }}>
          🛒 Sepete Ekle
        </DialogTitle>
        <DialogContent>
          {selectedPackage && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" sx={{ color: game.color, mb: 1 }}>
                {game.name}
              </Typography>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                {selectedPackage.amount}
              </Typography>
              {selectedPackage.bonus && (
                <Chip
                  label={selectedPackage.bonus}
                  sx={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2
                  }}
                />
              )}
              <Typography variant="h4" sx={{ color: game.color, fontWeight: 'bold' }}>
                ₺{selectedPackage.price}
              </Typography>
              {selectedPackage.originalPrice && (
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through' }}>
                  ₺{selectedPackage.originalPrice}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            onClick={() => setPurchaseDialog(false)}
            sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
            İptal
          </Button>
          <Button 
            onClick={addToCart}
            variant="contained"
            sx={{
              background: `linear-gradient(45deg, ${game.color}, ${game.color}DD)`,
              color: 'white',
              fontWeight: 'bold',
              px: 4
            }}
          >
            Sepete Ekle
          </Button>
        </DialogActions>
      </Dialog>

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
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
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
            Sepete Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetail;
