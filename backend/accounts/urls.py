from django.urls import path
from django.http import JsonResponse

def accounts_list(request):
    return JsonResponse({
        'message': 'Accounts API',
        'endpoints': [
            'GET /api/accounts/ - List accounts',
            'POST /api/accounts/register/ - Register user',
            'POST /api/accounts/login/ - Login user',
            'GET /api/accounts/profile/ - User profile',
        ]
    })

urlpatterns = [
    path('', accounts_list, name='accounts_list'),
] 