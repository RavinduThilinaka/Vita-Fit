import requests
from django.conf import settings
from rest_framework import status
from django.http import JsonResponse


class TokenAuthenticationMiddleware:
    """Middleware to validate token with User Service"""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        # ✅ Skip validation for public routes
        if request.path.startswith('/swagger') or request.path.startswith('/admin') or request.path.startswith('/redoc'):
            return self.get_response(request)

        # ✅ Get Authorization header
        auth_header = request.headers.get('Authorization', '')

        if not auth_header:
            return JsonResponse(
                {'error': 'Authorization header missing'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # ✅ Support both Token and Bearer
        if auth_header.startswith('Token '):
            token = auth_header.split(' ')[1]
        elif auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        else:
            return JsonResponse(
                {'error': 'Invalid token format'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # ✅ Call User Service
        try:
            response = requests.post(
                settings.USER_SERVICE_URL,
                json={'token': token},
                timeout=5
            )

            if response.status_code == 200:
                request.user_info = response.json()
                return self.get_response(request)

            return JsonResponse(
                {'error': 'Invalid or expired token'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        except requests.exceptions.RequestException:
            return JsonResponse(
                {'error': 'User Service unavailable'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )