from rest_framework import serializers

from climbs.models import Problem, Climbable, TopoImage
from climbs.serializer_fields import GpsPinField


class LocationSerializer(serializers.ModelSerializer):
    on = serializers.CharField(source="name")
    coordinates = GpsPinField(source="location")

    class Meta:
        model = Climbable
        fields = ["on", "coordinates"]


class ProblemSerializer(serializers.ModelSerializer):
    location = LocationSerializer(source="climbable")
    tags = serializers.StringRelatedField(many=True)
    dist_km = serializers.FloatField(read_only=True)
    ascents = serializers.IntegerField(read_only=True)
    rating = serializers.FloatField(read_only=True)

    class Meta:
        model = Problem
        fields = [
            "id",
            "name",
            "description",
            "grade",
            "location",
            "tags",
            "dist_km",
            "ascents",
            "rating",
        ]


class TopoImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopoImage
        fields = ["id", "climbable", "image"]
