from django.contrib import admin
from .models import Category, Product, ProductKey

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

class ProductKeyInline(admin.TabularInline):
    model = ProductKey
    extra = 0
    readonly_fields = ('created_at', 'sold_at', 'sold_to')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'platform', 'product_type', 'current_price', 'is_active', 'in_stock')
    list_filter = ('category', 'platform', 'product_type', 'is_active', 'in_stock', 'premium_only')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'description', 'category')
        }),
        ('Ürün Detayları', {
            'fields': ('product_type', 'platform', 'amount', 'image')
        }),
        ('Fiyatlandırma', {
            'fields': ('price', 'discount_price')
        }),
        ('Stok ve Durum', {
            'fields': ('is_active', 'in_stock', 'stock_count', 'premium_only')
        }),
    )
    
    inlines = [ProductKeyInline]
    
    def current_price(self, obj):
        return f"{obj.current_price} TL"
    current_price.short_description = "Güncel Fiyat"

@admin.register(ProductKey)
class ProductKeyAdmin(admin.ModelAdmin):
    list_display = ('product', 'status', 'created_at', 'sold_at', 'sold_to')
    list_filter = ('status', 'product__category', 'created_at')
    search_fields = ('product__name', 'sold_to__username')
    readonly_fields = ('created_at', 'sold_at')
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('product', 'sold_to')
