from django.urls import path
from .views import ProgressListCreateView, ProgressRetrieveUpdateDestroyView

urlpatterns = [
    path('progress/', ProgressListCreateView.as_view(), name='progress-list'),
    path('progress/<int:pk>/', ProgressRetrieveUpdateDestroyView.as_view(), name='progress-detail'),
]