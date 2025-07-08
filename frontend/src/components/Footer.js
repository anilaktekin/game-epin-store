import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  useTheme
} from '@mui/material';
import {
  SportsEsports,
  Twitter,
  Instagram,
  YouTube
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  const socialLinks = [
    { icon: <Twitter />, url: '#', color: '#1DA1F2' },
    { icon: <Instagram />, url: '#', color: '#E4405F' },
    { icon: <YouTube />, url: '#', color: '#FF0000' },
  ];

  const quickLinks = [
    { title: 'Ana Sayfa', url: '/' },
    { title: 'Oyun E-Pinleri', url: '/products' },
    { title: 'Oyun Keyleri', url: '/keys' },
    { title: 'Premium Üyelik', url: '/subscription' },
    { title: 'Sepetim', url: '/cart' },
    { title: 'Şans Çarkı', url: '/wheel' },
    { title: 'Hakkımızda', url: '/about' },
  ];

  const supportLinks = [
    { title: 'Yardım Merkezi', url: '/help' },
    { title: 'İletişim', url: '/contact' },
    { title: 'SSS', url: '/faq' },
    { title: 'Geri Bildirim', url: '/feedback' },
  ];

  const legalLinks = [
    { title: 'Kullanım Şartları', url: '/terms' },
    { title: 'Gizlilik Politikası', url: '/privacy' },
    { title: 'Çerez Politikası', url: '/cookies' },
    { title: 'KVKK', url: '/kvkk' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #16213E 0%, #0F0F23 100%)',
        borderTop: '1px solid rgba(108, 99, 255, 0.2)',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo & Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SportsEsports sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography
                variant="h6"
                sx={{
                  background: 'linear-gradient(45deg, #6C63FF, #FF6B6B)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }}
              >
                BroPin
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
              Oyun dünyasının en güvenilir e-pin ve key satış platformu. 
              Favori oyunlarınız için anında teslimat.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                      color: social.color,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Hızlı Linkler
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Destek
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Yasal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
              Güvenli Ödeme
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                💳 Kredi Kartı
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                🏦 Havale/EFT
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                📱 Mobil Ödeme
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                💰 Bakiye
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 4,
            pt: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            © 2024 BroPin. Tüm hakları saklıdır. | 
            <Box component="span" sx={{ mx: 1 }}>🎮</Box>
            Güvenli ve hızlı oyun deneyimi
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 