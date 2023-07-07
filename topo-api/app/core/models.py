from django.contrib.auth.models import AbstractUser

from django.contrib.gis.db import models


class CustomUser(AbstractUser):
    pass


class Climbable(models.Model):
    TYPE_CHOICES = [
        ("BL", "block"),
        ("WA", "wall"),
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=2, choices=TYPE_CHOICES, default="BL")
    location = models.PointField()

    def __str__(self):
        return self.name
