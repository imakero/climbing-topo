from rest_framework import serializers
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
