from rest_framework import generics
from core.serializers import ProblemSerializer

from core.models import Problem


class ProblemList(generics.ListCreateAPIView):
    queryset = Problem.objects.prefetch_related("tags").select_related(
        "climbable"
    )
    serializer_class = ProblemSerializer
