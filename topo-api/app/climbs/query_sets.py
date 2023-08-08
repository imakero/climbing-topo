from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import fromstr
from django.db import models


class ProblemQuerySet(models.QuerySet):
    rating = models.Avg("ascent__given_rating")
    ascents = models.Count("ascent")

    def with_annotations(self, *args):
        for arg in args:
            annotation = getattr(self, arg, None)

            if annotation is None:
                raise ValueError(f"Annotation {arg} does not exist")

            self = self.annotate(**{arg: annotation})

        return self.order_by("id")

    def with_dist_km(self, lon, lat):
        if lon is None or lat is None:
            return self

        point = fromstr(f"SRID=4326;POINT ({lon} {lat})")
        return self.annotate(
            dist_km=Distance("location__position", point) / 1000,
        )
