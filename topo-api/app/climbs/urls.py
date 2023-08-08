from django.urls import path
from climbs.views import (
    LocationImagesView,
    LocationImageView,
    LocationView,
    LocationsView,
    ProblemsView,
    ProblemView,
)

urlpatterns = [
    path("locations/", LocationsView.as_view(), name="locations"),
    path("locations/<int:pk>/", LocationView.as_view(), name="location"),
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
