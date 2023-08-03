from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from shared.permissions import IsOwnerOrReadOnly

from .filters import AscentFilter
from .models import Ascent
from .serializers import AscentSerializer


class AscentsView(generics.ListCreateAPIView):
    queryset = Ascent.objects.all()
    serializer_class = AscentSerializer
    filterset_class = AscentFilter
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AscentView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ascent.objects.all()
    serializer_class = AscentSerializer
    permission_classes = [IsAdminUser | IsOwnerOrReadOnly]
