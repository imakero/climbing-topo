from django.urls import path
from .views import AllAscentsListView, AscentDetailView


urlpatterns = [
    path(
        "activities/ascents/",
        AllAscentsListView.as_view(),
        name="all-ascents-list",
    ),
    path(
        "activities/ascents/<int:pk>/",
        AscentDetailView.as_view(),
        name="ascents-detail",
    ),
]
