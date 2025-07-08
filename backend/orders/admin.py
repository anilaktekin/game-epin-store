from django.contrib import admin
from .models import Order, OrderItem, Payment

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('total_price', 'created_at')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'user', 'status', 'payment_method', 'final_amount', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('order_id', 'user__username', 'user__email')
    readonly_fields = ('order_id', 'created_at', 'updated_at')
    
    fieldsets = (
        (None, {
            'fields': ('order_id', 'user', 'status', 'payment_method')
        }),
        ('Fiyatlandırma', {
            'fields': ('total_amount', 'discount_amount', 'final_amount')
        }),
        ('Ödeme Detayları', {
            'fields': ('payment_id', 'payment_status')
        }),
        ('Zaman Bilgileri', {
            'fields': ('created_at', 'updated_at', 'completed_at')
        }),
    )
    
    inlines = [OrderItemInline]
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'unit_price', 'total_price', 'delivery_status')
    list_filter = ('delivery_status', 'created_at')
    search_fields = ('order__order_id', 'product__name')
    readonly_fields = ('total_price', 'created_at')
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('order', 'product')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'payment_method', 'amount', 'status', 'external_payment_id', 'created_at')
    list_filter = ('payment_method', 'status', 'created_at')
    search_fields = ('order__order_id', 'external_payment_id')
    readonly_fields = ('created_at', 'updated_at')
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('order')
