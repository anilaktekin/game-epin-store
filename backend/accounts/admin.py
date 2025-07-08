from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, BalanceTransaction

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'balance', 'is_premium', 'premium_expires', 'date_joined')
    list_filter = ('is_premium', 'is_staff', 'is_superuser', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Ek Bilgiler', {
            'fields': ('phone', 'balance', 'is_premium', 'premium_expires')
        }),
    )
    
    readonly_fields = ('date_joined', 'last_login')

@admin.register(BalanceTransaction)
class BalanceTransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'transaction_type', 'description', 'created_at')
    list_filter = ('transaction_type', 'created_at')
    search_fields = ('user__username', 'description')
    readonly_fields = ('created_at',)
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')
