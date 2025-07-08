from django.urls import path
from django.http import JsonResponse

def orders_list(request):
    return JsonResponse({
        'message': 'Orders API',
        'endpoints': [
            'GET /api/orders/ - List orders',
            'POST /api/orders/ - Create order',
            'GET /api/orders/<id>/ - Order detail',
        ]
    })

urlpatterns = [
    path('', orders_list, name='orders_list'),
] 