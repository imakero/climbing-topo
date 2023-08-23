from rest_framework import serializers
from climbs.serializer_fields import LocationField

from climbs.models import Problem, Location, LocationImage, Tag, Line
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
    location = LocationField(include_nested=False)

    class Meta:
        model = LocationImage
        fields = ["id", "location", "image", "image_width", "image_height"]
        read_only_fields = ["image_width", "image_height"]


class LocationSerializer(serializers.ModelSerializer):
    position = GpsPinField()
    images = LocationImageSerializer(
        many=True, read_only=True, source="locationimage_set"
    )

    class Meta:
        model = Location
        fields = ["id", "name", "type", "position", "images"]


class LocationFlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "name", "type"]


class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = ["id", "location_image", "problem", "points"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request = self.context.get("request", None)
        if request and request.method in ["PATCH", "PUT"]:
            self.fields["location_image"].read_only = True
