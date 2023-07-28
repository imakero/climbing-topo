from django.urls import path
from climbs.views import ProblemList, TopoImageList, TopoImageDetail

urlpatterns = [
    path("problems/", ProblemList.as_view(), name="problems"),
    path("topos/", TopoImageList.as_view(), name="topos"),
    path("topos/<int:pk>/", TopoImageDetail.as_view(), name="topo"),
]
