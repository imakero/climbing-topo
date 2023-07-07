from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Climbable


@admin.register(Climbable)
class ClimbableAdmin(OSMGeoAdmin):
    list_display = ("name", "type", "location")
    search_fields = ("name",)
