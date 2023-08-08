from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin

from .models import Location, Problem, Tag


@admin.register(Location)
class LocationAdmin(GISModelAdmin):
    list_display = ("name", "type", "position")
    search_fields = ("name",)


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ("name", "grade", "location")
    search_fields = ("name", "location__name")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)
    list_display = (
        "id",
        "name",
    )
    search_fields = ("name",)
