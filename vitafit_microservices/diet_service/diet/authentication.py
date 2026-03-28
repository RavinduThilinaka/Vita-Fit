import requests
from django.conf import settings
from rest_framework import status
from django.http import JsonResponse

class TokenAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        if request.path.startswith('/swagger') or request.path.startswith('/admin') or request.path.startswith('/redoc'):
            return self.get_response(request)
        
        auth_header = request.headers.get('Authorization', '')
        token = auth_header.replace('Token ', '').replace('Bearer ', '')
        
        if not token:
            return JsonResponse(
                {'error': 'Authentication token is required'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        try:
            response = requests.post(
                settings.USER_SERVICE_URL,
                json={'token': token},
                timeout=5
            )
            
            if response.status_code == 200:
                request.user_info = response.json()
                return self.get_response(request)
            else:
                return JsonResponse(
                    {'error': 'Invalid or expired token'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
                
        except requests.exceptions.RequestException:
            return JsonResponse(
                {'error': 'Unable to validate token'}, 
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )