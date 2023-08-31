from django.contrib.gis.geos import fromstr

from rest_framework import serializers
from climbs.models import Location


class GpsPinField(serializers.Field):
    def to_representation(self, value):
        lon, lat = value.x, value.y
        return {
            "lon": lon,
            "lat": lat,
            "google_maps_string": f"{lat}, {lon}",
        }

    def to_internal_value(self, data):
        return fromstr(f"SRID=4326;POINT ({data['lon']} {data['lat']})")


class TagsField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        return value.name

    def to_internal_value(self, data):
        return super().to_internal_value(data)


class LocationField(serializers.Field):
    def __init__(self, include_nested=True, **kwargs):
        self.include_nested = include_nested
        super().__init__(**kwargs)

    def to_representation(self, value):
        if self.include_nested:
            from climbs.serializers import LocationSerializer

            return LocationSerializer(value).data
        else:
            from climbs.serializers import LocationImageLocationSerializer

            return LocationImageLocationSerializer(value).data

    def to_internal_value(self, data):
        return Location.objects.get(pk=data)
