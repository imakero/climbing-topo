from django.urls import path
from climbs.views import ProblemList

urlpatterns = [path("problems/", ProblemList.as_view(), name="index")]
