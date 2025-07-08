from django.urls import path
from django.http import JsonResponse

def wheel_info(request):
    return JsonResponse({
        'message': 'Wheel API',
        'endpoints': [
            'GET /api/wheel/ - Wheel info',
            'POST /api/wheel/spin/ - Spin wheel',
            'GET /api/wheel/prizes/ - List prizes',
        ]
    })

urlpatterns = [
    path('', wheel_info, name='wheel_info'),
] 