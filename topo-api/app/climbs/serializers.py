from rest_framework import serializers
from climbs.serializer_fields import LocationField

from climbs.models import Problem, Location, LocationImage, Tag
from climbs.serializer_fields import TagsField, GpsPinField


class ProblemSerializer(serializers.ModelSerializer):
    location = LocationField()
    tags = TagsField(many=True, queryset=Tag.objects.all())
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
            "location",
        ]
        read_only_fields = ["tags", "dist_km", "ascents", "rating"]


class LocationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationImage
        fields = ["id", "location", "image"]


class LocationSerializer(serializers.ModelSerializer):
    position = GpsPinField()
    images = LocationImageSerializer(
        many=True, read_only=True, source="locationimage_set"
    )

    class Meta:
        model = Location
        fields = ["id", "name", "type", "position", "images"]
