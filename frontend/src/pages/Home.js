import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme,
  Paper,
  Avatar,
  IconButton
} from '@mui/material';
import {
  SportsEsports,
  Casino,
  Star,
  LocalOffer,
  Speed,
  Security,
  Support,
  ShoppingCart,
  AccountBalanceWallet,
  Key,
  TrendingUp,
  People,
  Verified,
  PlayCircle,
  ArrowForward,
  Diamond
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Oyun E-Pinleri",
      subtitle: "En Popüler Oyunlar İçin",
      description: "Valorant, Fortnite, PUBG Mobile ve daha fazlası...",
      image: "🎮",
      color: "#6C63FF",
      action: () => navigate('/products')
    },
    {
      title: "Game Keys",
      subtitle: "Steam, Epic Games, Battle.net",
      description: "AAA oyunlar en uygun fiyatlarla",
      image: "🔑",
      color: "#FF6B6B",
      action: () => navigate('/keys')
    },
    {
      title: "Premium Üyelik",
      subtitle: "Özel İndirimler ve Avantajlar",
      description: "%25'e varan indirimler sizi bekliyor",
      image: "⭐",
      color: "#FFD700",
      action: () => navigate('/subscription')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    {
      title: "Oyun E-Pinleri",
      description: "VP, RP, UC ve daha fazlası",
      icon: <SportsEsports sx={{ fontSize: 40 }} />,
      color: "#6C63FF",
      path: "/products"
    },
    {
      title: "Oyun Keyleri", 
      description: "Steam, Epic Games keyleri",
      icon: <Key sx={{ fontSize: 40 }} />,
      color: "#FF6B6B",
      path: "/keys"
    },
    {
      title: "Premium Üyelik",
      description: "Özel indirimler kazanın",
      icon: <Star sx={{ fontSize: 40 }} />,
      color: "#FFD700",
      path: "/subscription"
    },
    {
      title: "Şans Çarkı",
      description: "Günlük ödüller kazanın",
      icon: <Casino sx={{ fontSize: 40 }} />,
      color: "#4CAF50",
      path: "/wheel"
    }
  ];

  const featuredGames = [
    {
      name: "Valorant",
      amount: "1000 VP",
      price: "79.99",
      originalPrice: "89.99",
      image: "/images/games/valorant.jpg",
      color: "#ff4655",
      path: "/products/valorant"
    },
    {
      name: "League of Legends",
      amount: "1380 RP", 
      price: "99.99",
      originalPrice: "119.99",
      image: "/images/games/league-of-legends.jpg",
      color: "#c89b3c",
      path: "/products/league-of-legends"
    },
    {
      name: "Fortnite",
      amount: "2800 V-Papel",
      price: "189.99",
      originalPrice: "209.99",
      image: "/images/games/fortnite.jpg",
      color: "#00d4ff",
      path: "/products/fortnite"
    }
  ];

  const statistics = [
    { number: "50K+", label: "Mutlu Müşteri", icon: <People /> },
    { number: "1M+", label: "Tamamlanan Sipariş", icon: <ShoppingCart /> },
    { number: "99.9%", label: "Başarı Oranı", icon: <Verified /> },
    { number: "24/7", label: "Destek Hizmeti", icon: <Support /> }
  ];

  const features = [
    {
      icon: <Speed sx={{ fontSize: 50, color: '#6C63FF' }} />,
      title: 'Anında Teslimat',
      description: 'Otomatik teslimat sistemi ile siparişleriniz saniyeler içinde hesabınızda'
    },
    {
      icon: <Security sx={{ fontSize: 50, color: '#4CAF50' }} />,
      title: 'Güvenli Ödeme',
      description: '256-bit SSL şifrelemesi ile güvenle ödeme yapın'
    },
    {
      icon: <Support sx={{ fontSize: 50, color: '#FF6B6B' }} />,
      title: '7/24 Canlı Destek',
      description: 'Uzman ekibimiz her zaman yardımınıza hazır'
    },
    {
      icon: <LocalOffer sx={{ fontSize: 50, color: '#FFD700' }} />,
      title: 'En İyi Fiyatlar',
      description: 'Piyasadaki en uygun fiyat garantisi'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${heroSlides[currentSlide].color}20 0%, #1A1A2E 50%, #16213E 100%)`,
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Chip
                  label="BroPin'e Hoş Geldiniz"
                  sx={{
                    background: `${heroSlides[currentSlide].color}20`,
                    color: heroSlides[currentSlide].color,
                    fontWeight: 'bold',
                    mb: 3,
                    border: `1px solid ${heroSlides[currentSlide].color}40`
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.1
                  }}
                >
                  {heroSlides[currentSlide].title}
                  <Box
                    component="span"
                    sx={{
                      background: `linear-gradient(45deg, ${heroSlides[currentSlide].color}, #FF6B6B)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block',
                      fontSize: { xs: '1.8rem', md: '2.5rem' }
                    }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    mb: 4,
                    fontWeight: 400
                  }}
                >
                  {heroSlides[currentSlide].description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                  <Button
                    onClick={heroSlides[currentSlide].action}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      background: `linear-gradient(45deg, ${heroSlides[currentSlide].color}, #FF6B6B)`,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '25px',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 10px 30px ${heroSlides[currentSlide].color}40`,
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Keşfet
                  </Button>
                  <Button
                    component={Link}
                    to="/cart"
                    variant="outlined"
                    size="large"
                    startIcon={<ShoppingCart />}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderRadius: '25px',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-3px)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Sepete Git
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                  fontSize: { xs: '120px', md: '200px' },
                  transition: 'all 0.5s ease',
                  filter: `drop-shadow(0 0 30px ${heroSlides[currentSlide].color}40)`
                }}
              >
                {heroSlides[currentSlide].image}
              </Box>
            </Grid>
          </Grid>
          
          {/* Slide Indicators */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
            {heroSlides.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentSlide(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: currentSlide === index ? heroSlides[currentSlide].color : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ py: 6, background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {statistics.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: '#6C63FF', mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Quick Actions */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          🚀 Ne Arıyorsunuz?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                component={Link}
                to={action.path}
                sx={{
                  height: 200,
                  cursor: 'pointer',
                  background: `linear-gradient(135deg, ${action.color}15 0%, ${action.color}05 100%)`,
                  border: `1px solid ${action.color}30`,
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    border: `2px solid ${action.color}`,
                    boxShadow: `0 20px 40px ${action.color}20`,
                  }
                }}
              >
                <Box sx={{ color: action.color, mb: 2 }}>
                  {action.icon}
                </Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                  {action.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {action.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            ⭐ Öne Çıkan Ürünler
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            En popüler oyunlar için özel fiyatlar
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {featuredGames.map((game, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component={Link}
                to={game.path}
                sx={{
                  height: 350,
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
                  border: `1px solid ${game.color}30`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    border: `2px solid ${game.color}`,
                    boxShadow: `0 20px 40px ${game.color}20`,
                  }
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    background: `linear-gradient(135deg, ${game.color}20 0%, ${game.color}40 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '80px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={game.image} 
                    alt={game.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '0'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-size: 80px;">🎮</div>';
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                    {game.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: game.color, fontWeight: 'bold', mb: 2 }}>
                    {game.amount}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ color: game.color, fontWeight: 'bold' }}>
                      ₺{game.price}
                    </Typography>
                    {game.originalPrice && (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.5)', 
                          textDecoration: 'line-through' 
                        }}
                      >
                        ₺{game.originalPrice}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            💎 Neden BroPin?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    height: 250,
                    borderRadius: '15px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(108, 99, 255, 0.3)',
                    }
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #6C63FF 0%, #FF6B6B 100%)',
              borderRadius: '30px',
              border: 'none'
            }}
          >
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              Hemen Başlayın! 🚀
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
              Premium üyelik ile %25'e varan indirimler ve özel avantajlar sizi bekliyor
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/subscription"
                variant="contained"
                size="large"
                startIcon={<Star />}
                sx={{
                  background: 'white',
                  color: '#6C63FF',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '25px',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Premium Ol
              </Button>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                size="large"
                startIcon={<SportsEsports />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '25px',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Alışverişe Başla
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 