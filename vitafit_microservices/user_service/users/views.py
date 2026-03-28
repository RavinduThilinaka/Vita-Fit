from rest_framework import viewsets, permissions, status
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, TokenVerifySerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from rest_framework.decorators import action, api_view, permission_classes
from django.utils import timezone
from rest_framework.permissions import AllowAny
from knox.auth import TokenAuthentication  # ✅ IMPORTANT

User = get_user_model()


class LoginViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)

            if user:
                _, token = AuthToken.objects.create(user)
                return Response({
                    'user': UserSerializer(user).data,
                    'token': token,
                })
            else:
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class UserView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


# ✅ ✅ FIXED TOKEN VERIFY FUNCTION
@api_view(['POST'])
@permission_classes([AllowAny])
def verify_token(request):
    token = request.data.get('token')

    if not token:
        return Response({'valid': False, 'error': 'Token missing'}, status=400)

    try:
        auth = TokenAuthentication()
        user_auth_tuple = auth.authenticate_credentials(token.encode())

        if user_auth_tuple is None:
            return Response({'valid': False}, status=401)

        user, auth_token = user_auth_tuple

        return Response({
            'valid': True,
            'user_id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': user.role
        })

    except Exception as e:
        return Response({'valid': False, 'error': str(e)}, status=401)