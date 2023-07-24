from django.db import IntegrityError
import pytest


@pytest.mark.django_db
def test_ascent(add_ascent, problem, user):
    ascent = add_ascent(
        problem=problem,
        user=user,
        comment="Hard!",
        given_rating=5,
    )

    assert ascent.problem == problem
    assert ascent.user == user
    assert ascent.comment == "Hard!"
    assert ascent.given_rating == 5


@pytest.mark.django_db
def test_ascent_gets_default_rating_of_none_if_no_rating_given(
    add_ascent, problem, user
):
    ascent = add_ascent(problem=problem, user=user)

    assert ascent.given_rating is None


@pytest.mark.django_db
def test_ascent_gets_default_comment_of_empty_string_if_no_comment_given(
    add_ascent, problem, user
):
    ascent = add_ascent(problem=problem, user=user)

    assert ascent.comment == ""


@pytest.mark.django_db
def test_exception_raised_if_user_already_have_logged_ascent(
    add_ascent, problem, user
):
    add_ascent(problem=problem, user=user)

    with pytest.raises(IntegrityError):
        add_ascent(problem=problem, user=user)
