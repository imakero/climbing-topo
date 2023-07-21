import pytest

from django.contrib.gis.geos import fromstr


@pytest.mark.django_db
def test_climbable(add_climbable, location):
    climbable = add_climbable(
        name="Svälthammaren",
        type="BL",
        location=location,
    )
    assert climbable.name == "Svälthammaren"
    assert climbable.type == "BL"
    assert climbable.location == location
    assert str(climbable) == "Svälthammaren"


@pytest.mark.django_db
def test_climbable_gets_default_type_block(add_climbable):
    climbable = add_climbable(
        name="Svälthammaren",
        location=fromstr(
            "POINT(-59.77591805596081 17.3728775782919)", srid=4326
        ),
    )
    assert climbable.type == "BL"
    assert climbable.get_type_display() == "block"


@pytest.mark.django_db
def test_tag(tag_crimpy):
    assert tag_crimpy.name == "crimpy"
    assert str(tag_crimpy) == "crimpy"


@pytest.mark.django_db
def test_problem(problem, climbable, tag_crimpy, tag_slopers):
    assert problem.climbable == climbable
    assert problem.name == "Watchtower"
    assert problem.description == "Classic testpiece!"
    assert problem.grade == "7C"
    assert set(problem.tags.all()) == {tag_crimpy, tag_slopers}
    assert problem.tags.count() == 2
    assert str(problem) == "Watchtower"
