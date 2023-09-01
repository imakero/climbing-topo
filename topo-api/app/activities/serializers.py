from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.settings import api_settings
from .models import Ascent
from django.contrib.auth import get_user_model

User = get_user_model()


class AscentSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ["id", "username", "first_name", "last_name"]

    user = UserSerializer(read_only=True)

    class Meta:
        model = Ascent
        fields = [
            "id",
            "user",
            "problem",
            "comment",
            "given_rating",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["user"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        request_method = self.context["request"].method
        if request_method in ["PUT", "PATCH"]:
            self.fields["problem"].read_only = True

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError(
                {
                    api_settings.NON_FIELD_ERRORS_KEY: [
                        "You have already logged an ascent of this problem."
                    ]
                }
            )
