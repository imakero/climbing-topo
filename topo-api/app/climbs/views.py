from rest_framework import generics
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from climbs.filters import ProblemFilter
from climbs.models import Problem, Location, LocationImage
from climbs.serializers import (
    ProblemSerializer,
    LocationImageSerializer,
    LocationSerializer,
)


class ProblemsView(generics.ListCreateAPIView):
    serializer_class = ProblemSerializer
    filterset_class = ProblemFilter
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        lon = self.request.query_params.get("lon", None)
        lat = self.request.query_params.get("lat", None)

        return (
            Problem.objects.prefetch_related("tags")
            .select_related("location")
            .with_annotations("ascents", "rating")
            .with_dist_km(lon, lat)
        )


class ProblemView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProblemSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        lon = self.request.query_params.get("lon", None)
        lat = self.request.query_params.get("lat", None)

        return (
            Problem.objects.prefetch_related("tags")
            .select_related("location")
            .with_annotations("ascents", "rating")
            .with_dist_km(lon, lat)
        )


class LocationsView(generics.ListCreateAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class LocationView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class LocationImagesView(generics.ListCreateAPIView):
    serializer_class = LocationImageSerializer
    queryset = LocationImage.objects.all()


class LocationImageView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LocationImageSerializer
    queryset = LocationImage.objects.all()

    def perform_destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.image.delete(save=False)
        return super().perform_destroy(request, *args, **kwargs)
