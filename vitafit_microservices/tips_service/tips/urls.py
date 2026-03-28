from django.urls import path
from .views import TipListCreateView, TipRetrieveUpdateDestroyView

urlpatterns = [
    path('tips/', TipListCreateView.as_view(), name='tip-list'),
    path('tips/<int:pk>/', TipRetrieveUpdateDestroyView.as_view(), name='tip-detail'),
]