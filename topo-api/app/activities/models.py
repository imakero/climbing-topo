from django.db import models
from shared.models import TimeStampModel


class Ascent(TimeStampModel):
    ZERO_TO_FIVE_CHOICES = (
        (0, "Horrible"),
        (1, "Ok"),
        (2, "Good"),
        (3, "Great"),
        (4, "Amazing"),
        (5, "Perfect"),
    )
    problem = models.ForeignKey("climbs.Problem", on_delete=models.CASCADE)
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    given_rating = models.IntegerField(
        choices=ZERO_TO_FIVE_CHOICES, blank=True, null=True
    )
    comment = models.TextField(max_length=1000, blank=True, default="")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "problem"],
                name="user and problem must be unique together",
            )
        ]
