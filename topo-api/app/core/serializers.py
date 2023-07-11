from rest_framework_gis import serializers

from core.models import Problem


class ProblemSerializer(serializers.ModelSerializer):
    location = serializers.GeometryField(source="climbable.location")

    class Meta:
        model = Problem
        fields = [
            "id",
            "name",
            "description",
            "grade",
            "climbable",
            "tags",
            "location",
        ]
