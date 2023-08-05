import pytest

from django.contrib.auth.models import Group


@pytest.mark.django_db
def test_user_gets_default_group_user_when_created(add_user):
    user = add_user(
        username="testuser",
        email="testuser@example.com",
        password="testpassword",
    )

    assert user.groups.count() == 1
    assert user.groups.first().name == "user"


@pytest.mark.django_db
def test_user_group_does_not_change_on_user_update(add_user):
    user = add_user(
        username="testuser",
        email="testuser@example.com",
        password="testpassword",
    )

    moderator_group = Group.objects.get(name="moderator")
    user.groups.set([moderator_group])

    user.email = "newemail@example.com"
    user.save()

    assert user.groups.count() == 1
    assert user.groups.first().name == "moderator"
