import pytest

from django.contrib.gis.geos import fromstr

from ..models import Climbable, Problem, Tag


@pytest.fixture
def climbable():
    return Climbable.objects.create(
        name="Svälthammaren",
        type="BL",
        location=fromstr(
            "POINT(-59.77591805596081 17.3728775782919)", srid=4326
        ),
    )


@pytest.fixture
def tag_crimpy():
    return Tag.objects.create(name="crimpy")


@pytest.fixture
def tag_slopers():
    return Tag.objects.create(name="slopers")


@pytest.fixture
def problem(climbable, tag_crimpy, tag_slopers):
    p = Problem.objects.create(
        climbable=climbable,
        name="Watchtower",
        description="Classic testpiece!",
        grade="7C",
    )
    p.tags.set([tag_crimpy.id, tag_slopers.id])
    return p
