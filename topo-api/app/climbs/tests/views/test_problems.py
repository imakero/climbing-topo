import copy
from django.urls import reverse
import pytest

from climbs.models import Problem, Tag

PROBLEM_DIRECTLY_COMPARABLE_FIELDS = [
    "id",
    "name",
    "description",
    "grade",
    "ascents",
    "rating",
]


def get_query_params(query_params={}, **kwargs):
    _query_params = copy.deepcopy(query_params)
    for k, v in kwargs.items():
        if v is not None:
            _query_params[k] = v
    return _query_params


def compare_problem(response_problem, problem):
    for field in PROBLEM_DIRECTLY_COMPARABLE_FIELDS:
        assert response_problem[field] == getattr(problem, field)

    location = response_problem["location"]
    assert location["on"] == problem.climbable.name

    coordinates = location["coordinates"]
    assert coordinates["lon"] == problem.climbable.location.x
    assert coordinates["lat"] == problem.climbable.location.y

    x, y = problem.climbable.location.x, problem.climbable.location.y
    assert coordinates["google_maps_string"] == f"{y}, {x}"


def test_get_problem_list(db, client, problem, problem_other, ascent):
    assert Problem.objects.count() == 2

    response = client.get(reverse("problems"))

    assert response.status_code == 200
    assert len(response.data) == 2

    problems = Problem.objects.with_annotations("ascents", "rating")
    for response_problem, problem in zip(
        response.data,
        problems,
    ):
        compare_problem(response_problem, problem)

