from django.urls import path
from django.http import JsonResponse

def products_list(request):
    return JsonResponse({
        'message': 'Products API',
        'endpoints': [
            'GET /api/products/ - List products',
            'GET /api/products/<id>/ - Product detail',
            'GET /api/products/categories/ - List categories',
        ]
    })

urlpatterns = [
    path('', products_list, name='products_list'),
] 