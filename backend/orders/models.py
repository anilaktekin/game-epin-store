from django.db import models
from django.contrib.auth import get_user_model
import uuid
from decimal import Decimal

User = get_user_model()

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Beklemede'),
        ('processing', 'İşleniyor'),
        ('completed', 'Tamamlandı'),
        ('cancelled', 'İptal Edildi'),
        ('failed', 'Başarısız'),
    ]

    PAYMENT_METHODS = [
        ('balance', 'Bakiye'),
        ('credit_card', 'Kredi Kartı'),
        ('bank_transfer', 'Havale'),
        ('mobile_payment', 'Mobil Ödeme'),
    ]

    # Order identification
    order_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    
    # Order details
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    
    # Pricing
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    final_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Payment details
    payment_id = models.CharField(max_length=100, blank=True, null=True)
    payment_status = models.CharField(max_length=50, blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Sipariş #{self.order_id} - {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Delivered keys
    delivered_keys = models.ManyToManyField('products.ProductKey', blank=True)
    delivery_status = models.CharField(max_length=20, choices=[
        ('pending', 'Beklemede'),
        ('delivered', 'Teslim Edildi'),
        ('failed', 'Başarısız'),
    ], default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} x{self.quantity}"

    def save(self, *args, **kwargs):
        self.total_price = self.unit_price * self.quantity
        super().save(*args, **kwargs)

class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Beklemede'),
        ('processing', 'İşleniyor'),
        ('success', 'Başarılı'),
        ('failed', 'Başarısız'),
        ('cancelled', 'İptal Edildi'),
        ('refunded', 'İade Edildi'),
    ]

    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    payment_method = models.CharField(max_length=20, choices=Order.PAYMENT_METHODS)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # External payment system details
    external_payment_id = models.CharField(max_length=100, blank=True, null=True)
    external_status = models.CharField(max_length=50, blank=True, null=True)
    
    # Internal status
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Ödeme {self.order.order_id} - {self.amount} TL"
