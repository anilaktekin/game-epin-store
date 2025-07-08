import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs
} from '@mui/material';
import {
  Person,
  Edit,
  ShoppingBag,
  Star,
  AccountBalanceWallet,
  Security,
  Notifications,
  History,
  Settings,
  Email,
  Phone,
  ArrowBack,
  TrendingUp,
  EmojiEvents,
  LocalOffer
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editDialog, setEditDialog] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: 'GameMaster2024',
    email: 'gamemaster@example.com',
    phone: '+90 555 123 4567',
    memberSince: '2023-01-15',
    avatar: '/images/avatars/default.jpg',
    isPremium: true,
    premiumPlan: 'Premium Plan',
    premiumExpiry: '2024-12-31'
  });

  const stats = {
    totalOrders: 47,
    totalSpent: 2456.50,
    savedMoney: 428.75,
    favoriteGames: ['Valorant', 'League of Legends', 'Steam'],
    level: 'VIP Customer'
  };

  const recentOrders = [
    {
      id: '#12345',
      date: '2024-06-15',
      game: 'Valorant',
      amount: '1000 VP',
      price: 79.99,
      status: 'Tamamlandı'
    },
    {
      id: '#12344',
      date: '2024-06-10',
      game: 'Steam',
      amount: '50 TL Wallet',
      price: 52.99,
      status: 'Tamamlandı'
    },
    {
      id: '#12343',
      date: '2024-06-05',
      game: 'League of Legends',
      amount: '1380 RP',
      price: 99.99,
      status: 'Tamamlandı'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    setEditDialog(true);
  };

  const saveProfile = () => {
    setEditDialog(false);
    // Backend'e profil güncellemesi gönderilir
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}
      >
        Ana Sayfaya Dön
      </Button>

      {/* Profile Header */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          border: '1px solid rgba(108, 99, 255, 0.3)',
          borderRadius: '20px'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={userInfo.avatar}
              sx={{
                width: 100,
                height: 100,
                border: userInfo.isPremium ? '3px solid #FFD700' : '3px solid #6C63FF'
              }}
            >
              <Person sx={{ fontSize: 50 }} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                {userInfo.username}
              </Typography>
              {userInfo.isPremium && (
                <Chip
                  icon={<Star />}
                  label={userInfo.premiumPlan}
                  sx={{
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    color: '#000',
                    fontWeight: 'bold'
                  }}
                />
              )}
              <Chip
                label={stats.level}
                sx={{
                  backgroundColor: 'rgba(108, 99, 255, 0.2)',
                  color: '#6C63FF',
                  border: '1px solid rgba(108, 99, 255, 0.3)'
                }}
              />
            </Box>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
              Üye olduğu tarih: {new Date(userInfo.memberSince).toLocaleDateString('tr-TR')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip icon={<Email />} label={userInfo.email} size="small" />
              <Chip icon={<Phone />} label={userInfo.phone} size="small" />
            </Box>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={handleEditProfile}
              sx={{
                borderColor: '#6C63FF',
                color: '#6C63FF',
                '&:hover': {
                  borderColor: '#6C63FF',
                  backgroundColor: 'rgba(108, 99, 255, 0.1)'
                }
              }}
            >
              Profili Düzenle
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <ShoppingBag sx={{ color: '#6C63FF', fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                {stats.totalOrders}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Toplam Sipariş
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <AccountBalanceWallet sx={{ color: '#FF6B6B', fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                ₺{stats.totalSpent.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Toplam Harcama
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <LocalOffer sx={{ color: '#4CAF50', fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                ₺{stats.savedMoney.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Toplam Tasarruf
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <EmojiEvents sx={{ color: '#FFD700', fontSize: 40, mb: 1 }} />
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                {userInfo.isPremium ? 'VIP' : 'Standart'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Üyelik Seviyesi
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          border: '1px solid rgba(108, 99, 255, 0.3)',
          borderRadius: '15px'
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.7)',
              '&.Mui-selected': {
                color: '#6C63FF'
              }
            }
          }}
        >
          <Tab label="Son Siparişler" icon={<History />} />
          <Tab label="Abonelik" icon={<Star />} />
          <Tab label="Ayarlar" icon={<Settings />} />
        </Tabs>

        {/* Recent Orders Tab */}
        <TabPanel value={tabValue} index={0}>
          <List>
            {recentOrders.map((order, index) => (
              <React.Fragment key={order.id}>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingBag sx={{ color: '#6C63FF' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                          {order.game} - {order.amount}
                        </Typography>
                        <Typography sx={{ color: '#6C63FF', fontWeight: 'bold' }}>
                          ₺{order.price}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Sipariş: {order.id} - {new Date(order.date).toLocaleDateString('tr-TR')}
                        </Typography>
                        <Chip
                          label={order.status}
                          size="small"
                          sx={{
                            backgroundColor: '#4CAF50',
                            color: 'white'
                          }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {index < recentOrders.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/orders')}
              sx={{
                borderColor: '#6C63FF',
                color: '#6C63FF'
              }}
            >
              Tüm Siparişleri Görüntüle
            </Button>
          </Box>
        </TabPanel>

        {/* Subscription Tab */}
        <TabPanel value={tabValue} index={1}>
          {userInfo.isPremium ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Star sx={{ color: '#FFD700', fontSize: 80, mb: 2 }} />
              <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
                {userInfo.premiumPlan} Aktif
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                Aboneliğiniz {new Date(userInfo.premiumExpiry).toLocaleDateString('tr-TR')} tarihine kadar geçerli
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/subscription')}
                sx={{
                  borderColor: '#FFD700',
                  color: '#FFD700',
                  mr: 2
                }}
              >
                Aboneliği Yönet
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/subscription')}
                sx={{
                  backgroundColor: '#6C63FF'
                }}
              >
                Plan Değiştir
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Star sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 80, mb: 2 }} />
              <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
                Premium Üyeliğiniz Yok
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                Premium üye olun ve özel indirimlerden faydalanın
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/subscription')}
                sx={{
                  backgroundColor: '#FFD700',
                  color: '#000',
                  fontWeight: 'bold'
                }}
              >
                Premium'a Geç
              </Button>
            </Box>
          )}
        </TabPanel>

        {/* Settings Tab */}
        <TabPanel value={tabValue} index={2}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Notifications sx={{ color: '#6C63FF' }} />
              </ListItemIcon>
              <ListItemText
                primary="Bildirimler"
                secondary="E-posta ve push bildirimleri"
                primaryTypographyProps={{ color: 'white' }}
                secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
              />
              <Button size="small">Ayarla</Button>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Security sx={{ color: '#6C63FF' }} />
              </ListItemIcon>
              <ListItemText
                primary="Güvenlik"
                secondary="Şifre değiştirme ve 2FA"
                primaryTypographyProps={{ color: 'white' }}
                secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
              />
              <Button size="small">Yönet</Button>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <AccountBalanceWallet sx={{ color: '#6C63FF' }} />
              </ListItemIcon>
              <ListItemText
                primary="Ödeme Yöntemleri"
                secondary="Kayıtlı kartlar ve bakiye"
                primaryTypographyProps={{ color: 'white' }}
                secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
              />
              <Button size="small">Düzenle</Button>
            </ListItem>
          </List>
        </TabPanel>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#1A1A2E', color: 'white' }}>
          Profili Düzenle
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1A1A2E', color: 'white' }}>
          <Box sx={{ py: 2 }}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              value={userInfo.username}
              onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="E-posta"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Telefon"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1A1A2E' }}>
          <Button onClick={() => setEditDialog(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            İptal
          </Button>
          <Button onClick={saveProfile} variant="contained" sx={{ backgroundColor: '#6C63FF' }}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
