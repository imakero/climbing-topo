from django_filters import rest_framework as filters

from activities.models import Ascent


class AscentFilter(filters.FilterSet):
    class Meta:
        model = Ascent
        fields = ["problem", "user"]
