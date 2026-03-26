from django.urls import path
from .views import WorkoutListCreateView, WorkoutRetrieveUpdateDestroyView

urlpatterns = [
    path('workouts/', WorkoutListCreateView.as_view(), name='workout-list'),
    path('workouts/<int:pk>/', WorkoutRetrieveUpdateDestroyView.as_view(), name='workout-detail'),
]