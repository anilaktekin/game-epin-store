from django.db import models
from decimal import Decimal

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    # image = models.ImageField(upload_to='categories/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

class Product(models.Model):
    PRODUCT_TYPES = [
        ('game_currency', 'Oyun Para Birimi'),
        ('game_key', 'Oyun Key'),
        ('store_credit', 'Mağaza Kredisi'),
        ('subscription', 'Abonelik'),
    ]

    PLATFORMS = [
        ('valorant', 'Valorant'),
        ('steam', 'Steam'),
        ('google_play', 'Google Play Store'),
        ('app_store', 'App Store'),
        ('epic_games', 'Epic Games'),
        ('other', 'Diğer'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPES)
    platform = models.CharField(max_length=20, choices=PLATFORMS)
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    # Product details
    amount = models.CharField(max_length=100, help_text="Örn: 1000 VP, 50 TL Steam Cüzdan")
    
    # Images
    # image = models.ImageField(upload_to='products/', blank=True, null=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    in_stock = models.BooleanField(default=True)
    stock_count = models.IntegerField(default=0, help_text="Manuel key yönetimi için")
    
    # Premium
    premium_only = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.amount}"

    @property
    def current_price(self):
        return self.discount_price if self.discount_price else self.price

    @property
    def discount_percentage(self):
        if self.discount_price and self.price > 0:
            return int(((self.price - self.discount_price) / self.price) * 100)
        return 0

class ProductKey(models.Model):
    STATUS_CHOICES = [
        ('available', 'Mevcut'),
        ('sold', 'Satıldı'),
        ('reserved', 'Rezerve'),
        ('expired', 'Süresi Dolmuş'),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='keys')
    key_code = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    sold_at = models.DateTimeField(blank=True, null=True)
    sold_to = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f"{self.product.name} - {self.status}"
