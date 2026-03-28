from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginViewSet, UserView, verify_token

router = DefaultRouter()
router.register('register', RegisterView, basename='register')
router.register('login', LoginViewSet, basename='login')
router.register('users', UserView, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('verify-token/', verify_token, name='verify-token'),
]