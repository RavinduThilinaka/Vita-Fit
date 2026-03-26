from django.urls import path
from .views import NotificationListCreateView, NotificationRetrieveUpdateDestroyView

urlpatterns = [
    path('notifications/', NotificationListCreateView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/', NotificationRetrieveUpdateDestroyView.as_view(), name='notification-detail'),
]