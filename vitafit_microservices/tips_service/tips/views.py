from rest_framework import generics
from .models import Tip
from .serializers import TipSerializer

class TipListCreateView(generics.ListCreateAPIView):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer

class TipRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer