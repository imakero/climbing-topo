import pytest

from django.contrib.gis.geos import fromstr

from core.models import Climbable, Tag


@pytest.mark.django_db
def test_climbable():
    climbable = Climbable.objects.create(
        name="Svälthammaren",
        type="BL",
        location=fromstr(
            "POINT(-59.77591805596081 17.3728775782919)", srid=4326
        ),
    )
    assert climbable.name == "Svälthammaren"
    assert climbable.type == "BL"
    assert climbable.location == fromstr(
        "POINT(-59.77591805596081 17.3728775782919)", srid=4326
    )
    assert str(climbable) == "Svälthammaren"


@pytest.mark.django_db
def test_climbable_gets_default_type_bl():
    climbable = Climbable.objects.create(
        name="Svälthammaren",
        location=fromstr(
            "POINT(-59.77591805596081 17.3728775782919)", srid=4326
        ),
    )
    assert climbable.type == "BL"
    assert climbable.get_type_display() == "block"


@pytest.mark.django_db
def test_tag():
    tag = Tag.objects.create(name="slab")
    assert tag.name == "slab"
    assert str(tag) == "slab"
