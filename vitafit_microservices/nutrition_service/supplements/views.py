from rest_framework import generics
from .models import Supplement
from .serializers import SupplementSerializer

class SupplementListCreateView(generics.ListCreateAPIView):
    queryset = Supplement.objects.all()
    serializer_class = SupplementSerializer

class SupplementRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Supplement.objects.all()
    serializer_class = SupplementSerializer