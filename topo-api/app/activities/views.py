from rest_framework import generics
from rest_framework.exceptions import NotAuthenticated
from .models import Ascent
from .serializers import AscentSerializer


class AllAscentsListView(generics.ListCreateAPIView):
    queryset = Ascent.objects.all()
    serializer_class = AscentSerializer

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise NotAuthenticated()
        serializer.save(user=self.request.user)


class AscentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ascent.objects.all()
    serializer_class = AscentSerializer
