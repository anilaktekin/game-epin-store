from django.contrib import admin
from .models import WheelConfiguration, WheelPrize, WheelSpin, WheelSpinHistory

class WheelPrizeInline(admin.TabularInline):
    model = WheelPrize
    extra = 0

@admin.register(WheelConfiguration)
class WheelConfigurationAdmin(admin.ModelAdmin):
    list_display = ('name', 'cost', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name',)
    
    inlines = [WheelPrizeInline]

@admin.register(WheelPrize)
class WheelPrizeAdmin(admin.ModelAdmin):
    list_display = ('name', 'wheel_config', 'prize_type', 'probability', 'is_active', 'current_total_wins')
    list_filter = ('prize_type', 'is_active', 'wheel_config')
    search_fields = ('name', 'description')
    
    fieldsets = (
        (None, {
            'fields': ('wheel_config', 'name', 'description', 'prize_type')
        }),
        ('Ödül Detayları', {
            'fields': ('product', 'balance_amount', 'discount_percentage', 'premium_days')
        }),
        ('Olasılık Ayarları', {
            'fields': ('probability', 'max_daily_wins', 'max_total_wins')
        }),
        ('Görünüm', {
            'fields': ('color', 'image', 'is_active')
        }),
    )

@admin.register(WheelSpin)
class WheelSpinAdmin(admin.ModelAdmin):
    list_display = ('spin_id', 'user', 'wheel_config', 'cost', 'is_winner', 'prize', 'prize_delivered', 'created_at')
    list_filter = ('is_winner', 'prize_delivered', 'wheel_config', 'created_at')
    search_fields = ('spin_id', 'user__username')
    readonly_fields = ('spin_id', 'created_at')
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user', 'wheel_config', 'prize')

@admin.register(WheelSpinHistory)
class WheelSpinHistoryAdmin(admin.ModelAdmin):
    list_display = ('date', 'wheel_config', 'total_spins', 'total_winners', 'total_revenue')
    list_filter = ('wheel_config', 'date')
    readonly_fields = ('date', 'wheel_config', 'total_spins', 'total_winners', 'total_revenue', 'total_prizes_value')
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('wheel_config')
