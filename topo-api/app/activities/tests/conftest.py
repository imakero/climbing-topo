import pytest

from activities.models import Ascent


@pytest.fixture
def add_ascent():
    def _add_ascent(**kwargs):
        return Ascent.objects.create(**kwargs)

    return _add_ascent
