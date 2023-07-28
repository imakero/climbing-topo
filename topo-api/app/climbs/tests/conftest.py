from django.test import override_settings
import pytest

from climbs.models import TopoImage


@pytest.fixture
def tmp_media_folder(tmp_path):
    return tmp_path / "media"


@pytest.fixture
def add_topo_image(tmp_media_folder):
    def _add_topo_image(**kwargs):
        with override_settings(MEDIA_ROOT=tmp_media_folder):
            return TopoImage.objects.create(**kwargs)

    return _add_topo_image


@pytest.fixture
def topo_image_1(add_topo_image, climbable, image_file):
    return add_topo_image(climbable=climbable, image=image_file)


@pytest.fixture
def topo_image_2(add_topo_image, climbable, image_file):
    image_file.name = "test_image_2.jpg"
    return add_topo_image(climbable=climbable, image=image_file)
