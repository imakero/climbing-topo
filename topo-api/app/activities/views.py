from rest_framework import generics
from .models import Ascent
from .serializers import AscentSerializer


class AllAscentsListView(generics.ListCreateAPIView):
    queryset = Ascent.objects.all()
    serializer_class = AscentSerializer


class AscentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ascent.objects.all()
    serializer_class = AscentSerializer
