from django.contrib.gis.geos import fromstr

from rest_framework import serializers


class GpsPinField(serializers.Field):
    def to_representation(self, value):
        lon, lat = value.x, value.y
        return {
            "lon": lon,
            "lat": lat,
            "google_maps_string": f"{lat}, {lon}",
        }

    def to_internal_value(self, data):
        return fromstr(f"SRID=4326;POINT ({data.lon} {data.lat})")
