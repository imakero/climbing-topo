from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import fromstr
from django.db.models import Q
from django_filters import rest_framework as filters

from .models import Problem


class CsvFilter(filters.CharFilter):
    def filter(self, qs, value):
        if value:
            value = value.split(",")
        return super().filter(qs, value)


class ProblemFilter(filters.FilterSet):
    grade = CsvFilter(field_name="grade", lookup_expr="lowercase__in")
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    description = filters.CharFilter(
        field_name="description", lookup_expr="icontains"
    )
    tags = CsvFilter(field_name="tags__name", lookup_expr="lowercase__in")
    location = filters.CharFilter(
        field_name="location__name", lookup_expr="icontains"
    )
    dist_km = filters.NumberFilter(method="filter_distance_from_point")

    min_ascents = filters.NumberFilter(method="filter_min_ascents")
    max_ascents = filters.NumberFilter(method="filter_max_ascents")
    min_rating = filters.NumberFilter(method="filter_min_rating")
    max_rating = filters.NumberFilter(method="filter_max_rating")

    class Meta:
        model = Problem
        fields = [
            "grade",
            "name",
            "tags",
            "location",
            "dist_km",
            "min_ascents",
            "max_ascents",
            "min_rating",
            "max_rating",
        ]

    def filter_distance_from_point(self, queryset, name, value):
        lon = self.request.query_params.get("lon", None)
        lat = self.request.query_params.get("lat", None)

        if lon is None or lat is None:
            return queryset

        point = fromstr(f"SRID=4326;POINT ({lon} {lat})")

        return queryset.annotate(
            dist_km=Distance("location__position", point) / 1000
        ).filter(dist_km__lte=value)

    def filter_min_ascents(self, queryset, name, value):
        return queryset.filter(ascents__gte=value)

    def filter_max_ascents(self, queryset, name, value):
        return queryset.filter(ascents__lte=value)

    def filter_min_rating(self, queryset, name, value):
        # Include unrated problems if min_rating is 0.
        if value == 0:
            return queryset
        return queryset.filter(rating__gte=value)

    def filter_max_rating(self, queryset, name, value):
        # Include problems that has not been rated.
        return queryset.filter(Q(rating__lte=value) | Q(rating__isnull=True))
