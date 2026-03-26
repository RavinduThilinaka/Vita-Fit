from django.urls import path
from .views import DietPlanListCreateView, DietPlanRetrieveUpdateDestroyView

urlpatterns = [
    path('diet-plans/', DietPlanListCreateView.as_view(), name='dietplan-list'),
    path('diet-plans/<int:pk>/', DietPlanRetrieveUpdateDestroyView.as_view(), name='dietplan-detail'),
]