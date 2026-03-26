from django.urls import path
from .views import SupplementListCreateView, SupplementRetrieveUpdateDestroyView

urlpatterns = [
    path('supplements/', SupplementListCreateView.as_view(), name='supplement-list'),
    path('supplements/<int:pk>/', SupplementRetrieveUpdateDestroyView.as_view(), name='supplement-detail'),
]