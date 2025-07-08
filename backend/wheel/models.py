from django.db import models
from django.contrib.auth import get_user_model
from decimal import Decimal
import uuid

User = get_user_model()

class WheelConfiguration(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, help_text="Çevirmek için gereken tutar")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.cost} TL"

class WheelPrize(models.Model):
    PRIZE_TYPES = [
        ('product', 'Ürün'),
        ('balance', 'Bakiye'),
        ('discount', 'İndirim Kuponu'),
        ('premium', 'Premium Üyelik'),
        ('nothing', 'Boş'),
    ]

    wheel_config = models.ForeignKey(WheelConfiguration, on_delete=models.CASCADE, related_name='prizes')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    prize_type = models.CharField(max_length=20, choices=PRIZE_TYPES)
    
    # Prize details
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE, blank=True, null=True)
    balance_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    discount_percentage = models.IntegerField(blank=True, null=True, help_text="İndirim yüzdesi")
    premium_days = models.IntegerField(blank=True, null=True, help_text="Premium üyelik gün sayısı")
    
    # Probability settings
    probability = models.DecimalField(max_digits=5, decimal_places=2, help_text="Kazanma olasılığı (0.01-100.00)")
    max_daily_wins = models.IntegerField(default=0, help_text="Günlük maksimum kazanım (0 = sınırsız)")
    max_total_wins = models.IntegerField(default=0, help_text="Toplam maksimum kazanım (0 = sınırsız)")
    
    # Display
    color = models.CharField(max_length=7, default='#FF6B6B', help_text="Hex renk kodu")
    # image = models.ImageField(upload_to='wheel_prizes/', blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-probability']

    def __str__(self):
        return f"{self.name} - %{self.probability}"

    @property
    def current_daily_wins(self):
        from django.utils import timezone
        today = timezone.now().date()
        return self.wheel_spins.filter(
            created_at__date=today,
            is_winner=True
        ).count()

    @property
    def current_total_wins(self):
        return self.wheel_spins.filter(is_winner=True).count()

    @property
    def is_available(self):
        if not self.is_active:
            return False
        
        if self.max_daily_wins > 0 and self.current_daily_wins >= self.max_daily_wins:
            return False
            
        if self.max_total_wins > 0 and self.current_total_wins >= self.max_total_wins:
            return False
            
        return True

class WheelSpin(models.Model):
    spin_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wheel_spins')
    wheel_config = models.ForeignKey(WheelConfiguration, on_delete=models.CASCADE, related_name='spins')
    
    # Spin details
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    is_winner = models.BooleanField(default=False)
    prize = models.ForeignKey(WheelPrize, on_delete=models.SET_NULL, blank=True, null=True, related_name='wheel_spins')
    
    # Prize delivery
    prize_delivered = models.BooleanField(default=False)
    delivery_notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        result = "Kazandı" if self.is_winner else "Kaybetti"
        return f"{self.user.username} - {result} - {self.created_at.strftime('%d.%m.%Y %H:%M')}"

class WheelSpinHistory(models.Model):
    """Günlük istatistikler için"""
    date = models.DateField()
    wheel_config = models.ForeignKey(WheelConfiguration, on_delete=models.CASCADE)
    total_spins = models.IntegerField(default=0)
    total_winners = models.IntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    total_prizes_value = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))

    class Meta:
        unique_together = ['date', 'wheel_config']
        ordering = ['-date']

    def __str__(self):
        return f"{self.wheel_config.name} - {self.date}"
