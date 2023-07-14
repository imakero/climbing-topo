from rest_framework import serializers

from core.models import Problem, Climbable
from core.serializer_fields import GpsPinField


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
        ]
