from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import fromstr
from django.db.models import Count, Avg

from rest_framework import generics

from climbs.filters import ProblemFilter
from climbs.models import Problem, TopoImage
from climbs.serializers import ProblemSerializer, TopoImageSerializer


class ProblemsView(generics.ListCreateAPIView):
    serializer_class = ProblemSerializer
    filterset_class = ProblemFilter
    queryset = (
        Problem.objects.prefetch_related("tags")
        .select_related("climbable")
        .annotate(
            ascents=Count("ascent"),
            rating=Avg("ascent__given_rating"),
        )
    )

    def get_queryset(self):
        lon = self.request.query_params.get("lon", None)
        lat = self.request.query_params.get("lat", None)

        if lon is None or lat is None:
            return self.queryset

        point = fromstr(f"SRID=4326;POINT ({lon} {lat})")

        return self.queryset.annotate(
            dist_km=Distance("climbable__location", point) / 1000,
        )


class TopoImagesView(generics.ListCreateAPIView):
    serializer_class = TopoImageSerializer
    queryset = TopoImage.objects.all()


class TopoImageView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TopoImageSerializer
    queryset = TopoImage.objects.all()

    def perform_destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.image.delete(save=False)
        return super().perform_destroy(request, *args, **kwargs)
