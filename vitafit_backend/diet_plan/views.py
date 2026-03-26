from rest_framework import generics
from .models import DietPlan
from .serializers import DietPlanSerializer

class DietPlanListCreateView(generics.ListCreateAPIView):
    queryset = DietPlan.objects.all()
    serializer_class = DietPlanSerializer

class DietPlanRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DietPlan.objects.all()
    serializer_class = DietPlanSerializer