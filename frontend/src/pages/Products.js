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
  Paper
} from '@mui/material';
import {
  Search,
  SportsEsports,
  TrendingUp,
  Star
} from '@mui/icons-material';

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Oyun verileri - kullanıcının verdiği görsellere göre
  const games = [
    {
      id: 'valorant',
      name: 'Valorant',
      currency: 'VP (Valorant Points)',
      description: 'Tactical FPS oyununda karakterler, silahlar ve daha fazlası',
      image: '/images/games/valorant.jpg', // Kullanıcının verdiği görsel
      color: '#ff4655',
      popular: true,
      category: 'FPS'
    },
    {
      id: 'fortnite',
      name: 'Fortnite',
      currency: 'V-Papel',
      description: 'Battle Royale evreni için kostümler ve eşyalar',
      image: '/images/games/fortnite.jpg',
      color: '#00d4ff',
      popular: true,
      category: 'Battle Royale'
    },
    {
      id: 'pubg-mobile',
      name: 'PUBG Mobile',
      currency: 'UC (Unknown Cash)',
      description: 'Mobil battle royale deneyimi için para birimi',
      image: '/images/games/pubg-mobile.jpg',
      color: '#ff9500',
      popular: true,
      category: 'Mobile BR'
    },
    {
      id: 'mobile-legends',
      name: 'Mobile Legends',
      currency: 'Elmas',
      description: 'MOBA oyunu için karakterler ve kostümler',
      image: '/images/games/mobile-legends.jpg',
      color: '#2196f3',
      popular: false,
      category: 'MOBA'
    },
    {
      id: 'brawl-stars',
      name: 'Brawl Stars',
      currency: 'Elmas',
      description: 'Supercell\'in popüler oyunu için premium para birimi',
      image: '/images/games/brawl-stars.jpg',
      color: '#8e24aa',
      popular: false,
      category: 'Action'
    },
    {
      id: 'league-of-legends',
      name: 'League of Legends',
      currency: 'RP (Riot Points)',
      description: 'Dünyanın en büyük MOBA oyunu için para birimi',
      image: '/images/games/league-of-legends.jpg',
      color: '#c89b3c',
      popular: true,
      category: 'MOBA'
    },
    {
      id: 'free-fire',
      name: 'Free Fire',
      currency: 'Elmas',
      description: 'Mobil battle royale oyunu için premium para birimi',
      image: '/images/games/free-fire.jpg',
      color: '#ff6b35',
      popular: false,
      category: 'Mobile BR'
    }
  ];

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (gameId) => {
    navigate(`/products/${gameId}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            color: 'white', 
            mb: 2,
            background: 'linear-gradient(45deg, #6C63FF, #FF6B6B)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          🎮 Oyun E-Pinleri
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
          En popüler oyunlar için e-pin ve içerik satın alın
        </Typography>

        {/* Search Bar */}
        <Box sx={{ maxWidth: '500px', mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Oyun ara..."
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
                border: '1px solid rgba(108, 99, 255, 0.3)',
                borderRadius: '15px',
                color: 'white',
                '&:hover': {
                  border: '1px solid rgba(108, 99, 255, 0.5)',
                },
                '&.Mui-focused': {
                  border: '1px solid #6C63FF',
                }
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
          />
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 6, flexWrap: 'wrap' }}>
          <Paper sx={{ 
            p: 2, 
            backgroundColor: 'rgba(108, 99, 255, 0.1)',
            border: '1px solid rgba(108, 99, 255, 0.3)',
            borderRadius: '15px',
            minWidth: '120px'
          }}>
            <Typography variant="h4" sx={{ color: '#6C63FF', fontWeight: 'bold', textAlign: 'center' }}>
              {games.length}
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
              24/7
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              Teslimat
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* All Games Section */}
      <Box>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'white', 
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            textAlign: 'center'
          }}
        >
          <SportsEsports sx={{ color: '#6C63FF' }} />
          Oyun E-Pinleri
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {filteredGames.map((game) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
              <Card
                onClick={() => handleGameClick(game.id)}
                sx={{
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
                  border: '1px solid rgba(108, 99, 255, 0.2)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  height: 320, // Sabit yükseklik
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    border: `1px solid ${game.color}`,
                    boxShadow: `0 10px 30px ${game.color}20`,
                  }
                }}
              >
                {/* Game Image */}
                <Box
                  sx={{
                    height: 180,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={game.image}
                    alt={game.name}
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
                      e.target.parentElement.style.background = `linear-gradient(135deg, ${game.color}20 0%, ${game.color}40 100%)`;
                      e.target.parentElement.style.display = 'flex';
                      e.target.parentElement.style.alignItems = 'center';
                      e.target.parentElement.style.justifyContent = 'center';
                      const icon = document.createElement('div');
                      icon.innerHTML = '🎮';
                      icon.style.fontSize = '50px';
                      icon.style.opacity = '0.7';
                      e.target.parentElement.appendChild(icon);
                    }}
                  />
                  {game.popular && (
                    <Chip
                      label="Popüler"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#FF6B6B',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ p: 2, height: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5, textAlign: 'center' }}>
                      {game.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: game.color, fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
                      {game.currency}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.3, textAlign: 'center' }}>
                      {game.description.length > 50 ? `${game.description.substring(0, 50)}...` : game.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Chip
                      label={game.category}
                      size="small"
                      sx={{
                        backgroundColor: `${game.color}20`,
                        color: game.color,
                        border: `1px solid ${game.color}40`,
                        fontSize: '0.75rem'
                      }}
                    />
                    <Button
                      size="small"
                      sx={{
                        color: game.color,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                        px: 1
                      }}
                    >
                      İncele →
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* No Results */}
      {filteredGames.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            Aradığınız oyun bulunamadı
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setSearchTerm('')}
            sx={{
              borderColor: '#6C63FF',
              color: '#6C63FF',
              '&:hover': {
                borderColor: '#6C63FF',
                backgroundColor: 'rgba(108, 99, 255, 0.1)'
              }
            }}
          >
            Tüm Oyunları Göster
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Products; 