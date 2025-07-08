import React, { useState } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Check,
  Star,
  Verified,
  Speed,
  Security,
  Support,
  Diamond,
  LocalOffer,
  ArrowBack,
  EmojiEvents
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscriptionDialog, setSubscriptionDialog] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null); // User's current subscription

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Temel',
      price: 19.99,
      period: 'ay',
      color: '#6C63FF',
      popular: false,
      icon: <Star sx={{ color: '#6C63FF', fontSize: 40 }} />,
      features: [
        '%5 İndirim',
        'E-posta Desteği',
        'Temel Raporlar'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 39.99,
      period: 'ay',
      color: '#FFD700',
      popular: true,
      icon: <Verified sx={{ color: '#FFD700', fontSize: 40 }} />,
      features: [
        '%15 İndirim',
        'Öncelikli Destek',
        'Detaylı Raporlar',
        'Özel Teklifler'
      ]
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 79.99,
      period: 'ay',
      color: '#FF6B6B',
      popular: false,
      icon: <Diamond sx={{ color: '#FF6B6B', fontSize: 40 }} />,
      features: [
        '%25 İndirim',
        '7/24 Canlı Destek',
        'VIP Teklifler',
        'Erken Erişim',
        'Özel İçerikler'
      ]
    }
  ];

  const benefits = [
    {
      icon: <LocalOffer sx={{ fontSize: 50 }} />,
      title: 'Özel İndirimler',
      description: 'Tüm ürünlerde ekstra indirim'
    },
    {
      icon: <Speed sx={{ fontSize: 50 }} />,
      title: 'Hızlı Teslimat',
      description: 'Öncelikli işlem sırası'
    },
    {
      icon: <Support sx={{ fontSize: 50 }} />,
      title: 'Premium Destek',
      description: '7/24 özel destek hattı'
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 50 }} />,
      title: 'VIP Avantajlar',
      description: 'Özel etkinlik ve teklifler'
    }
  ];

  const faqItems = [
    {
      question: 'Premium üyelik nasıl iptal edilir?',
      answer: 'Profil ayarlarından istediğiniz zaman iptal edebilirsiniz.'
    },
    {
      question: 'İndirimler ne zaman uygulanır?',
      answer: 'Satın alma sırasında otomatik olarak uygulanır.'
    },
    {
      question: 'Ödeme güvenli mi?',
      answer: 'Evet, 256-bit SSL şifreleme ile korunmaktadır.'
    }
  ];

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setSubscriptionDialog(true);
  };

  const confirmSubscription = () => {
    setCurrentSubscription(selectedPlan);
    setSubscriptionDialog(false);
    setSelectedPlan(null);
    // Backend'e subscription bilgisi gönderilir
  };

  const cancelSubscription = () => {
    setCurrentSubscription(null);
    // Backend'e iptal bilgisi gönderilir
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}
      >
        Ana Sayfaya Dön
      </Button>

      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            color: 'white', 
            mb: 2,
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          ⭐ Premium Üyelik
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
          Özel indirimler, öncelikli destek ve eksklüzif avantajlar
        </Typography>

        {/* Current Subscription Status */}
        {currentSubscription && (
          <Paper sx={{ 
            p: 3, 
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '15px',
            maxWidth: '400px',
            mx: 'auto',
            mb: 4
          }}>
            <Star sx={{ color: '#FFD700', fontSize: 40, mb: 1 }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              Aktif Üyeliğiniz
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFD700' }}>
              {currentSubscription.name} - {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()} tarihine kadar
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Subscription Plans */}
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
        {subscriptionPlans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              onClick={() => setSelectedPlan(plan)}
              sx={{
                cursor: 'pointer',
                background: plan.popular 
                  ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                  : 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
                border: plan.popular 
                  ? '2px solid #FFD700'
                  : selectedPlan?.id === plan.id 
                    ? '2px solid #6C63FF'
                    : '1px solid rgba(108, 99, 255, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                height: 450, // Sabit yükseklik
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: plan.popular 
                    ? '0 20px 40px rgba(255, 215, 0, 0.3)'
                    : '0 20px 40px rgba(108, 99, 255, 0.3)',
                }
              }}
            >
              {plan.popular && (
                <Chip
                  label="En Popüler"
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#FF6B6B',
                    color: 'white',
                    fontWeight: 'bold',
                    zIndex: 1
                  }}
                />
              )}

              <CardContent sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Box>
                  <Box sx={{ mb: 2 }}>
                    {plan.icon}
                  </Box>
                  <Typography variant="h5" sx={{ 
                    color: plan.popular ? '#000' : 'white', 
                    fontWeight: 'bold', 
                    mb: 1 
                  }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" sx={{ 
                    color: plan.popular ? '#000' : '#6C63FF', 
                    fontWeight: 'bold', 
                    mb: 1 
                  }}>
                    ₺{plan.price}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: plan.popular ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', 
                    mb: 2 
                  }}>
                    /{plan.period}
                  </Typography>
                </Box>

                <List sx={{ py: 0, mb: 2 }}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0.3, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 25 }}>
                        <Check sx={{ 
                          color: plan.popular ? '#000' : '#4CAF50', 
                          fontSize: 18 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature}
                        primaryTypographyProps={{ 
                          color: plan.popular ? '#000' : 'white',
                          fontSize: '0.85rem'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant={plan.popular ? 'contained' : 'outlined'}
                  onClick={() => handleSubscribe(plan)}
                  sx={{
                    py: 1.2,
                    fontWeight: 'bold',
                    ...(plan.popular ? {
                      backgroundColor: '#000',
                      color: '#FFD700',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.8)'
                      }
                    } : {
                      borderColor: '#6C63FF',
                      color: '#6C63FF',
                      '&:hover': {
                        borderColor: '#6C63FF',
                        backgroundColor: 'rgba(108, 99, 255, 0.1)'
                      }
                    })
                  }}
                >
                  {currentSubscription?.name === plan.name ? 'Mevcut Plan' : 'Seç'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Benefits Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 'bold' }}>
          Premium Üyelik Avantajları
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: 180,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(255,215,0,0.1)',
                    border: '1px solid rgba(255,215,0,0.3)',
                  }
                }}
              >
                <Box sx={{ color: '#FFD700', mb: 2 }}>
                  {benefit.icon}
                </Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  {benefit.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 'bold' }}>
          Sıkça Sorulan Sorular
        </Typography>
        <Box sx={{ maxWidth: '700px', mx: 'auto' }}>
          {faqItems.map((item, index) => (
            <Paper
              key={index}
              sx={{
                mb: 2,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px'
              }}
            >
              <Box sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 1, fontWeight: 'bold', fontSize: '1rem' }}>
                  {item.question}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {item.answer}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Subscription Confirmation Dialog */}
      <Dialog 
        open={subscriptionDialog} 
        onClose={() => setSubscriptionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#1A1A2E', color: 'white' }}>
          Abonelik Onayı
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1A1A2E', color: 'white' }}>
          {selectedPlan && (
            <Box sx={{ py: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Bu abonelik işlemi demo amaçlıdır.
              </Alert>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedPlan.name} - ₺{selectedPlan.price}/{selectedPlan.period}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                İlk ödeme tarihi: {new Date().toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Sonraki ödeme tarihi: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1A1A2E' }}>
          <Button onClick={() => setSubscriptionDialog(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            İptal
          </Button>
          <Button 
            onClick={confirmSubscription} 
            variant="contained" 
            sx={{ backgroundColor: selectedPlan?.color }}
          >
            Aboneliği Başlat
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Subscription; 