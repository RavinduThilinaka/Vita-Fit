from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import DietPlan
from .serializers import DietPlanSerializer

class DietPlanListCreateView(generics.ListCreateAPIView):
    queryset = DietPlan.objects.all()
    serializer_class = DietPlanSerializer
    permission_classes = [IsAuthenticated]  # middleware ensures user_info exists

class DietPlanRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DietPlan.objects.all()
    serializer_class = DietPlanSerializer
    permission_classes = [IsAuthenticated]