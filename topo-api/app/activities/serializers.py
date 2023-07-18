from rest_framework import serializers
from .models import Ascent


class AscentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ascent
        fields = ["id", "user", "problem", "comment", "given_rating"]
