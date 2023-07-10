from django.urls import path
from core.views import ProblemList

urlpatterns = [path("problems/", ProblemList.as_view(), name="index")]
