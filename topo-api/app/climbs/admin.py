from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin

from .models import Climbable, Problem, Tag


@admin.register(Climbable)
class ClimbableAdmin(GISModelAdmin):
    list_display = ("name", "type", "location")
    search_fields = ("name",)


@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ("name", "grade", "climbable")
    search_fields = ("name", "climbable__name")


admin.site.register(Tag)
