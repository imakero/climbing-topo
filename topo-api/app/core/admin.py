from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin

from .models import Climbable


@admin.register(Climbable)
class ClimbableAdmin(GISModelAdmin):
    list_display = ("name", "type", "location")
    search_fields = ("name",)
