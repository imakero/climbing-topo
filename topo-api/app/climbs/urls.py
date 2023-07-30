from django.urls import path
from climbs.views import ProblemsView, TopoImagesView, TopoImageView

urlpatterns = [
    path("problems/", ProblemsView.as_view(), name="problems"),
    path("topos/", TopoImagesView.as_view(), name="topos"),
    path("topos/<int:pk>/", TopoImageView.as_view(), name="topo"),
]
