from django.urls import path
from climbs.views import (
    ProblemsView,
    ProblemView,
    LocationImagesView,
    LocationImageView,
)

urlpatterns = [
    path("problems/", ProblemsView.as_view(), name="problems"),
    path("problems/<int:pk>/", ProblemView.as_view(), name="problem"),
    path(
        "location-images/",
        LocationImagesView.as_view(),
        name="location-images",
    ),
    path(
        "location-images/<int:pk>/",
        LocationImageView.as_view(),
        name="location-image",
    ),
]
