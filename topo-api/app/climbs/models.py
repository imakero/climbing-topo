import os
from django.contrib.gis.db import models
from climbs.query_sets import ProblemQuerySet


class Location(models.Model):
    TYPE_CHOICES = [
        ("BL", "block"),
        ("WA", "wall"),
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=2, choices=TYPE_CHOICES, default="BL")
    position = models.PointField()

    def __str__(self):
        return self.name


class Problem(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    grade = models.CharField(max_length=4)
    tags = models.ManyToManyField("Tag", related_name="problems", blank=True)

    objects = ProblemQuerySet.as_manager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id"]


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class LocationImage(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to=f"location_images/",
        width_field="image_width",
        height_field="image_height",
    )
    image_width = models.IntegerField()
    image_height = models.IntegerField()

    def save(self, *args, **kwargs):
        # Remove old Location image from disk if it's being updated
        if self.pk:
            old_object = LocationImage.objects.get(pk=self.pk)
            if self.image != old_object.image:
                old_object.image.delete(save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Location image for {self.location.name} - {self.image.name}"


class Line(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    location_image = models.ForeignKey(
        LocationImage, on_delete=models.CASCADE, related_name="lines"
    )
    points = models.LineStringField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["problem", "location_image"],
                name="problem and location_image must be unique together",
            )
        ]
