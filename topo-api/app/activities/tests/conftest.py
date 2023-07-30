import pytest

from activities.models import Ascent


@pytest.fixture
def add_ascent():
    def _add_ascent(**kwargs):
        return Ascent.objects.create(**kwargs)

    return _add_ascent


@pytest.fixture
def ascent(add_ascent, problem, user):
    return add_ascent(
        problem=problem, user=user, given_rating=4, comment="Yes!"
    )


@pytest.fixture
def ascent_other(add_ascent, problem_other, user_other):
    return add_ascent(
        problem=problem_other, user=user_other, given_rating=3, comment="Knee!"
    )
