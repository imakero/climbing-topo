from django.apps import AppConfig
from django.db import models
from climbs.lookups import LowerCase


class ClimbsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "climbs"

    def ready(self):
        models.CharField.register_lookup(LowerCase)
        models.TextField.register_lookup(LowerCase)
