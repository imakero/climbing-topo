from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import fromstr
from django_filters import rest_framework as filters

from .models import Problem


class ProblemFilter(filters.FilterSet):
    grade = filters.CharFilter(field_name="grade", lookup_expr="iexact")
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    description = filters.CharFilter(
        field_name="description", lookup_expr="icontains"
    )
    tags = filters.CharFilter(field_name="tags__name", lookup_expr="iexact")
    climbable = filters.CharFilter(
        field_name="climbable__name", lookup_expr="icontains"
    )
    dist_km = filters.NumberFilter(method="filter_distance_from_point")

    class Meta:
        model = Problem
        fields = ["grade", "name", "tags", "climbable", "dist_km"]

    def filter_distance_from_point(self, queryset, name, value):
        lon = self.request.query_params.get("lon", None)
        lat = self.request.query_params.get("lat", None)

        if lon is None or lat is None:
            return queryset

        point = fromstr(f"SRID=4326;POINT ({lon} {lat})")

        return queryset.annotate(
            dist_km=Distance("climbable__location", point) / 1000
        ).filter(dist_km__lte=value)
