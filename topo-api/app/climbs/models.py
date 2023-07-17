from django.contrib.gis.db import models


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


class Problem(models.Model):
    climbable = models.ForeignKey(Climbable, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    grade = models.CharField(max_length=4)
    tags = models.ManyToManyField("Tag", related_name="problems", blank=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
