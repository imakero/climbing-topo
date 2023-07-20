from django.urls import path
from climbs.views import ProblemList, TopoImageList

urlpatterns = [
    path("problems/", ProblemList.as_view(), name="problems"),
    path("topos/", TopoImageList.as_view(), name="topos"),
]
