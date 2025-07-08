import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  InputAdornment,
  useTheme,
  Paper,
  Rating
} from '@mui/material';
import {
  Search,
  Gamepad2,
  Key,
  ArrowBack,
  Download,
  Verified,
  LocalOffer
} from '@mui/icons-material';

const Keys = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Oyun key verileri
  const gameKeys = [
    {
      id: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
      platform: 'Steam',
      category: 'RPG',
      description: 'Geleceğin açık dünya aksiyon-macera oyunu',
      image: '/images/keys/cyberpunk-2077.jpg',
      color: '#FFEB3B',
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      rating: 4.2,
      popular: true,
      inStock: true,
      deliveryTime: 'Anında'
    },
    {
      id: 'gta-5',
      name: 'Grand Theft Auto V',
      platform: 'Steam',
      category: 'Action',
      description: 'Los Santos ve Blaine County\'de geçen aksiyon oyunu',
      image: '/images/keys/gta-5.jpg',
      color: '#4CAF50',
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.8,
      popular: true,
      inStock: true,
      deliveryTime: 'Anında'
    },
    {
      id: 'red-dead-redemption-2',
      name: 'Red Dead Redemption 2',
      platform: 'Steam',
      category: 'Action',
      description: 'Vahşi Batı\'da geçen epik macera oyunu',
      image: '/images/keys/rdr2.jpg',
      color: '#FF5722',
      price: 159.99,
      originalPrice: 199.99,
      discount: 20,
      rating: 4.9,
      popular: true,
      inStock: true,
      deliveryTime: 'Anında'
    },
    {
      id: 'witcher-3',
      name: 'The Witcher 3: Wild Hunt',
      platform: 'Steam',
      category: 'RPG',
      description: 'GOTY Edition ile birlikte gelişmiş fantasya RPG',
      image: '/images/keys/witcher-3.jpg',
      color: '#9C27B0',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.9,
      popular: false,
      inStock: true,
      deliveryTime: 'Anında'
    },
    {
      id: 'forza-horizon-5',
      name: 'Forza Horizon 5',
      platform: 'Steam',
      category: 'Racing',
      description: 'Meksika\'da geçen açık dünya yarış oyunu',
      image: '/images/keys/forza-horizon-5.jpg',
      color: '#FF9800',
      price: 249.99,
      originalPrice: 299.99,
      discount: 17,
      rating: 4.7,
      popular: false,
      inStock: true,
      deliveryTime: 'Anında'
    },
    {
      id: 'assassins-creed-valhalla',
      name: 'Assassin\'s Creed Valhalla',
      platform: 'Epic Games',
      category: 'Action',
      description: 'Viking çağında İngiltere\'de geçen aksiyon oyunu',
      image: '/images/keys/ac-valhalla.jpg',
      color: '#2196F3',
      price: 179.99,
      originalPrice: 249.99,
      discount: 28,
      rating: 4.5,
      popular: false,
      inStock: true,
      deliveryTime: 'Anında'
    },
    {
      id: 'call-of-duty-mw2',
      name: 'Call of Duty: Modern Warfare II',
      platform: 'Battle.net',
      category: 'FPS',
      description: 'Modern savaş temalı birinci şahıs nişancı oyunu',
      image: '/images/keys/cod-mw2.jpg',
      color: '#607D8B',
      price: 399.99,
      originalPrice: 499.99,
      discount: 20,
      rating: 4.3,
      popular: true,
      inStock: true,
      deliveryTime: 'Anında'
    },
    {
      id: 'elden-ring',
      name: 'Elden Ring',
      platform: 'Steam',
      category: 'RPG',
      description: 'FromSoftware\'in açık dünya souls-like oyunu',
      image: '/images/keys/elden-ring.jpg',
      color: '#FFC107',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      rating: 4.8,
      popular: true,
      inStock: true,
      deliveryTime: 'Anında'
    }
  ];

  const filteredKeys = gameKeys.filter(key =>
    key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyClick = (keyId) => {
    // Key detay sayfasına yönlendirme (şimdilik sepete ekleme simüle edelim)
    const keyItem = {
      id: `key-${keyId}`,
      gameName: gameKeys.find(k => k.id === keyId)?.name,
      amount: 'Digital Key',
      price: gameKeys.find(k => k.id === keyId)?.price,
      originalPrice: gameKeys.find(k => k.id === keyId)?.originalPrice,
      color: gameKeys.find(k => k.id === keyId)?.color,
      quantity: 1
    };

    // Sepete ekleme
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === keyItem.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(keyItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Storage event trigger etmek için
    window.dispatchEvent(new Event('storage'));
  };

  const platforms = [...new Set(gameKeys.map(key => key.platform))];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}
      >
        Ana Sayfaya Dön
      </Button>

      {/* Header */}
      <Typography variant="h3" sx={{ color: 'white', mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        🎮 Oyun Keyleri
      </Typography>

      {/* Category Cards */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ color: 'white', mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
          Kategoriler
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: 180,
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #171C2B 0%, #1E3A8A 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  border: '2px solid #3B82F6',
                  boxShadow: '0 15px 35px rgba(59, 130, 246, 0.2)',
                }
              }}
            >
              <Box sx={{ fontSize: '3rem', mb: 2 }}>💨</Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                Steam Key
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Steam platform oyunları
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: 180,
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #171C2B 0%, #7C3AED 100%)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  border: '2px solid #7C3AED',
                  boxShadow: '0 15px 35px rgba(124, 58, 237, 0.2)',
                }
              }}
            >
              <Box sx={{ fontSize: '3rem', mb: 2 }}>🎮</Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                Oyun Key
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Genel oyun anahtarları
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: 180,
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #171C2B 0%, #10B981 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  border: '2px solid #10B981',
                  boxShadow: '0 15px 35px rgba(16, 185, 129, 0.2)',
                }
              }}
            >
              <Box sx={{ fontSize: '3rem', mb: 2 }}>📱</Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                Play Store Key
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Android uygulama kredileri
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: 180,
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #171C2B 0%, #6366F1 100%)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  border: '2px solid #6366F1',
                  boxShadow: '0 15px 35px rgba(99, 102, 241, 0.2)',
                }
              }}
            >
              <Box sx={{ fontSize: '3rem', mb: 2 }}>🍎</Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                App Store Key
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                iOS uygulama kredileri
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            color: 'white', 
            mb: 2,
            background: 'linear-gradient(45deg, #FFC107, #FF5722)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          🔑 Oyun Keyleri
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'rgba(255,255,255,0.8)', 
            mb: 4,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Steam, Epic Games, Battle.net ve diğer platformlar için oyun keyleri
        </Typography>

        {/* Search Bar */}
        <Box sx={{ maxWidth: '500px', mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Oyun key ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(255,255,255,0.5)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                borderRadius: '15px',
                color: 'white',
                '&:hover': {
                  border: '1px solid rgba(255, 193, 7, 0.5)',
                },
                '&.Mui-focused': {
                  border: '1px solid #FFC107',
                }
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
          />
        </Box>

        {/* Platform Filter */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          {platforms.map((platform) => (
            <Chip
              key={platform}
              label={platform}
              sx={{
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                color: '#FFC107',
                border: '1px solid rgba(255, 193, 7, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 193, 7, 0.2)',
                }
              }}
            />
          ))}
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 6, flexWrap: 'wrap' }}>
          <Paper sx={{ 
            p: 2, 
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            borderRadius: '15px',
            minWidth: '120px'
          }}>
            <Typography variant="h4" sx={{ color: '#FFC107', fontWeight: 'bold', textAlign: 'center' }}>
              {gameKeys.length}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              Oyun Seçeneği
            </Typography>
          </Paper>
          <Paper sx={{ 
            p: 2, 
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            borderRadius: '15px',
            minWidth: '120px'
          }}>
            <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 'bold', textAlign: 'center' }}>
              Anında
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              Teslimat
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Game Keys Grid */}
      <Grid container spacing={3} justifyContent="center">
        {filteredKeys.map((key) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key.id}>
            <Card
              onClick={() => handleKeyClick(key.id)}
              sx={{
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
                border: '1px solid rgba(255, 193, 7, 0.2)',
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                height: 450, // Sabit yükseklik
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  border: `1px solid ${key.color}`,
                  boxShadow: `0 15px 35px ${key.color}20`,
                }
              }}
            >
              {/* Game Image */}
              <Box
                sx={{
                  height: 200,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={key.image}
                  alt={key.name}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                  onError={(e) => {
                    // Fallback to gradient background if image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = `linear-gradient(135deg, ${key.color}20 0%, ${key.color}40 100%)`;
                    e.target.parentElement.style.display = 'flex';
                    e.target.parentElement.style.alignItems = 'center';
                    e.target.parentElement.style.justifyContent = 'center';
                    const icon = document.createElement('div');
                    icon.innerHTML = '🎮';
                    icon.style.fontSize = '60px';
                    icon.style.opacity = '0.7';
                    e.target.parentElement.appendChild(icon);
                  }}
                />
                
                {/* Badges */}
                <Box sx={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <Chip
                    label={key.platform}
                    size="small"
                    sx={{
                      backgroundColor: key.color,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                  {key.popular && (
                    <Chip
                      label="Popüler"
                      size="small"
                      sx={{
                        backgroundColor: '#FF6B6B',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  )}
                </Box>

                {key.discount > 0 && (
                  <Chip
                    label={`%${key.discount} İndirim`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </Box>

              <CardContent sx={{ p: 2, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1, lineHeight: 1.2, textAlign: 'center' }}>
                    {key.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, fontSize: '0.85rem', lineHeight: 1.3, textAlign: 'center' }}>
                    {key.description.length > 50 ? `${key.description.substring(0, 50)}...` : key.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
                    <Rating value={key.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {key.rating}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Chip
                      label={key.category}
                      size="small"
                      sx={{
                        backgroundColor: `${key.color}20`,
                        color: key.color,
                        border: `1px solid ${key.color}40`,
                        fontSize: '0.75rem'
                      }}
                    />
                    <Chip
                      icon={<Download />}
                      label={key.deliveryTime}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        color: '#4CAF50',
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, gap: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                          ₺{key.price}
                        </Typography>
                        {key.originalPrice && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255,255,255,0.5)', 
                              textDecoration: 'line-through' 
                            }}
                          >
                            ₺{key.originalPrice}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Verified sx={{ color: '#4CAF50', fontSize: 20 }} />
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Key />}
                    sx={{
                      backgroundColor: key.color,
                      color: 'white',
                      fontWeight: 'bold',
                      py: 1,
                      '&:hover': {
                        backgroundColor: key.color,
                        opacity: 0.9
                      }
                    }}
                  >
                    Sepete Ekle
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredKeys.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            Aradığınız oyun key'i bulunamadı
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setSearchTerm('')}
            sx={{
              borderColor: '#FFC107',
              color: '#FFC107',
              '&:hover': {
                borderColor: '#FFC107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)'
              }
            }}
          >
            Tüm Key'leri Göster
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Keys; 