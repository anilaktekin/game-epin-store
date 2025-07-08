# GameStore - Oyun E-Pin Mağazası

Modern ve güvenli oyun e-pin satış platformu. Valorant, Steam, Google Play ve diğer platformlar için anında teslimat.

## 🎮 Özellikler

### ✅ Tamamlanan Özellikler
- **Modern UI/UX**: Material-UI ile oyuncu dostu tasarım
- **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- **Django Backend**: Güçlü ve ölçeklenebilir backend altyapısı
- **React Frontend**: Hızlı ve interaktif kullanıcı arayüzü
- **Database Modelleri**: Kullanıcı, ürün, sipariş ve şans çarkı modelleri

### 🚧 Geliştirme Aşamasında
- **Django API Endpoints**: RESTful API servisleri
- **Kullanıcı Kimlik Doğrulaması**: JWT tabanlı auth sistemi
- **Ödeme Entegrasyonu**: İyzico ödeme sistemi
- **Email Sistemi**: Otomatik key gönderimi
- **Şans Çarkı**: Gerçek zamanlı çark sistemi
- **Admin Panel**: Gelişmiş yönetim paneli

## 🚀 Başlangıç

### Gereksinimler
- Python 3.8+
- Node.js 16+
- Django 4.2
- React 18

### Backend Kurulumu

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend şu adreste çalışacak: http://127.0.0.1:8000

### Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Frontend şu adreste çalışacak: http://localhost:3000

## 📋 Proje Yapısı

```
game-epin-store/
├── backend/                 # Django Backend
│   ├── gamestore/          # Ana proje ayarları
│   ├── accounts/           # Kullanıcı yönetimi
│   ├── products/           # Ürün yönetimi
│   ├── orders/             # Sipariş yönetimi
│   ├── wheel/              # Şans çarkı
│   └── requirements.txt    # Python bağımlılıkları
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Yeniden kullanılabilir bileşenler
│   │   ├── pages/          # Sayfa bileşenleri
│   │   ├── services/       # API servisleri
│   │   └── utils/          # Yardımcı fonksiyonlar
│   └── package.json        # Node.js bağımlılıkları
└── README.md
```

## 🎨 Tasarım Teması

- **Ana Renkler**: 
  - Primary: #6C63FF (Mor)
  - Secondary: #FF6B6B (Kırmızı)
  - Background: #0F0F23 (Koyu Lacivert)
- **Typography**: Roboto font ailesi
- **Style**: Gaming-oriented, modern, gradient effects

## 🔧 Teknoloji Stack

### Backend
- **Django 4.2**: Web framework
- **Django REST Framework**: API geliştirme
- **SQLite**: Development database
- **Celery**: Asenkron görevler
- **Redis**: Cache ve message broker

### Frontend
- **React 18**: UI library
- **Material-UI**: Component library
- **React Router**: Navigation
- **Axios**: HTTP client
- **Recharts**: Charts ve grafikler

## 📝 Veritabanı Modelleri

### User (Kullanıcı)
- Özel kullanıcı modeli
- Bakiye sistemi
- Premium üyelik
- İşlem geçmişi

### Product (Ürün)
- Kategori ve platform sistemi
- Fiyatlandırma (indirim desteği)
- Stok yönetimi
- Key sistemi

### Order (Sipariş)
- Sipariş yönetimi
- Ödeme takibi
- Otomatik teslimat

### Wheel (Şans Çarkı)
- Yapılandırılabilir ödüller
- Olasılık sistemi
- Günlük limitler

## 🔐 Güvenlik

- JWT tabanlı kimlik doğrulama
- CORS koruması
- SQL injection koruması
- XSS koruması
- HTTPS zorunluluğu (production)

## 🎯 Sonraki Adımlar

1. **API Geliştirme**: Django REST API endpoints
2. **Authentication**: Kullanıcı giriş/kayıt sistemi
3. **Ödeme Sistemi**: İyzico entegrasyonu
4. **Email Service**: Otomatik key gönderimi
5. **Şans Çarkı**: Gerçek zamanlı çark animasyonu
6. **Admin Panel**: Gelişmiş yönetim arayüzü
7. **Production Deploy**: AWS/Digital Ocean deployment

## 📞 Destek

Herhangi bir sorun için lütfen iletişime geçin.

## 📄 Lisans

Bu proje özel kullanım içindir.

---

**GameStore** - Oyun dünyasının en güvenilir e-pin mağazası 🎮 