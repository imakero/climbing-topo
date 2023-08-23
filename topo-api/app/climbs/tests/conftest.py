import pytest

from django.test import override_settings
from django.contrib.gis.geos.linestring import LineString

from climbs.models import LocationImage, Line


@pytest.fixture
def tmp_media_folder(tmp_path):
    return tmp_path / "media"


@pytest.fixture
def add_location_image(tmp_media_folder):
    def _add_location_image(**kwargs):
        with override_settings(MEDIA_ROOT=tmp_media_folder):
            return LocationImage.objects.create(**kwargs)

    return _add_location_image


@pytest.fixture
def location_image(add_location_image, location, image_file):
    return add_location_image(location=location, image=image_file)


@pytest.fixture
def location_image_other(add_location_image, location_other, image_file_other):
    return add_location_image(location=location_other, image=image_file_other)


@pytest.fixture
def add_line():
    def _add_line(**kwargs):
        return Line.objects.create(**kwargs)

    return _add_line


@pytest.fixture
def line(add_line, location_image, problem):
    return add_line(
        location_image=location_image,
        problem=problem,
        points=LineString((0, 0), (1, 1)),
    )


@pytest.fixture
def line_other(add_line, location_image_other, problem_other):
    return add_line(
        location_image=location_image_other,
        problem=problem_other,
        points=LineString((1, 1), (4, 4)),
    )
