from rest_framework import serializers

from core.models import Problem


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ["id", "name", "description", "grade", "climbable", "tags"]
