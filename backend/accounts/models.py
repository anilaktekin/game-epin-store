from django.contrib.auth.models import AbstractUser
from django.db import models
from decimal import Decimal

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    is_premium = models.BooleanField(default=False)
    premium_expires = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class BalanceTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('deposit', 'Bakiye Yükleme'),
        ('purchase', 'Satın Alma'),
        ('refund', 'İade'),
        ('bonus', 'Bonus'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='balance_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.amount} TL - {self.get_transaction_type_display()}"
