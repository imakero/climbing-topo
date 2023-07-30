from django.urls import path
from .views import AscentsView, AscentView


urlpatterns = [
    path(
        "activities/ascents/",
        AscentsView.as_view(),
        name="ascents",
    ),
    path(
        "activities/ascents/<int:pk>/",
        AscentView.as_view(),
        name="ascent",
    ),
]
