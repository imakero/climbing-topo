import pytest

from django.contrib.gis.geos import fromstr

from climbs.models import Climbable, Problem, Tag
from users.models import User


@pytest.fixture
def add_user():
    def _add_user(**kwargs):
        return User.objects.create_user(**kwargs)

    return _add_user


@pytest.fixture
def user(add_user):
    return add_user(
        username="testuser", password="testpass", email="test@example.com"
    )


@pytest.fixture
def location():
    return fromstr("POINT(-59.77591805596081 17.3728775782919)", srid=4326)


@pytest.fixture
def add_climbable():
    def _add_climbable(**kwargs):
        return Climbable.objects.create(**kwargs)

    return _add_climbable


@pytest.fixture
def climbable(add_climbable, location):
    return add_climbable(name="Svälthammaren", type="BL", location=location)


@pytest.fixture
def add_tag():
    def _add_tag(**kwargs):
        return Tag.objects.create(**kwargs)

    return _add_tag


@pytest.fixture
def tag_crimpy(add_tag):
    return add_tag(name="crimpy")


@pytest.fixture
def tag_slopers(add_tag):
    return add_tag(name="slopers")


@pytest.fixture
def add_problem():
    def _add_problem(**kwargs):
        if "tags" in kwargs:
            tags = kwargs.pop("tags")
            problem = Problem.objects.create(**kwargs)
            problem.tags.set(tags)
            return problem
        return Problem.objects.create(**kwargs)

    return _add_problem


@pytest.fixture
def problem(add_problem, climbable, tag_crimpy, tag_slopers):
    return add_problem(
        climbable=climbable,
        name="Watchtower",
        description="Classic testpiece!",
        grade="7C",
        tags=[tag_crimpy, tag_slopers],
    )
