from rest_framework import generics, status
from rest_framework.response import Response
from .models import Workout
from .serializers import WorkoutSerializer

class WorkoutListCreateView(generics.ListCreateAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    
    def list(self, request, *args, **kwargs):
        # User info is available from middleware
        user_info = getattr(request, 'user_info', None)
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        user_info = getattr(request, 'user_info', None)
        return super().create(request, *args, **kwargs)

class WorkoutRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer