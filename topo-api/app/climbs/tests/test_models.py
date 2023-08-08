import pytest

from django.contrib.gis.geos import fromstr


@pytest.mark.django_db
def test_location(add_location, position):
    location = add_location(
        name="Svälthammaren",
        type="BL",
        position=position,
    )
    assert location.name == "Svälthammaren"
    assert location.type == "BL"
    assert location.position == position
    assert str(location) == "Svälthammaren"


@pytest.mark.django_db
def test_location_gets_default_type_block(add_location):
    location = add_location(
        name="Svälthammaren",
        position=fromstr(
            "POINT(-59.77591805596081 17.3728775782919)", srid=4326
        ),
    )
    assert location.type == "BL"
    assert location.get_type_display() == "block"


@pytest.mark.django_db
def test_tag(tag_crimpy):
    assert tag_crimpy.name == "crimpy"
    assert str(tag_crimpy) == "crimpy"


@pytest.mark.django_db
def test_problem(problem, location, tag_crimpy, tag_slopers):
    assert problem.location == location
    assert problem.name == "Watchtower"
    assert problem.description == "Classic testpiece!"
    assert problem.grade == "7C"
    assert set(problem.tags.all()) == {tag_crimpy, tag_slopers}
    assert problem.tags.count() == 2
    assert str(problem) == "Watchtower"
