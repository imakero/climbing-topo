from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import fromstr
from rest_framework import generics

from climbs.filters import ProblemFilter
from climbs.models import Problem
from climbs.serializers import ProblemSerializer


class ProblemList(generics.ListCreateAPIView):
    serializer_class = ProblemSerializer
    filterset_class = ProblemFilter

    def get_queryset(self):
        lon = self.request.query_params.get("lon", None)
        lat = self.request.query_params.get("lat", None)

        if lon is None or lat is None:
            return Problem.objects.prefetch_related("tags").select_related(
                "climbable"
            )

        point = fromstr(f"SRID=4326;POINT ({lon} {lat})")

        return (
            Problem.objects.prefetch_related("tags")
            .select_related("climbable")
            .annotate(dist_km=Distance("climbable__location", point) / 1000)
        )