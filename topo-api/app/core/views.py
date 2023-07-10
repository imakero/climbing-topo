from django.http import HttpResponse

from rest_framework import generics
from core.serializers import ProblemSerializer

from core.models import Problem


class ProblemList(generics.ListCreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
