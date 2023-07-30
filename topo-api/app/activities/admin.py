from django.contrib import admin

from .models import Ascent


@admin.register(Ascent)
class AscentAdmin(admin.ModelAdmin):
    list_display = ("problem", "user", "given_rating")
    search_fields = ("problem", "user")
