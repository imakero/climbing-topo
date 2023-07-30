from django.urls import reverse

from activities.models import Ascent
from rest_framework import status


def test_add_ascent(db, client, user, problem):
    assert Ascent.objects.count() == 0

    client.force_authenticate(user=user)
    response = client.post(
        reverse("ascents"),
        {
            "problem": problem.id,
            "given_rating": 4,
            "comment": "Yes!",
        },
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert Ascent.objects.count() == 1

    ascent = Ascent.objects.first()
    assert ascent.problem == problem
    assert ascent.user == user
    assert ascent.given_rating == 4
    assert ascent.comment == "Yes!"


def test_add_ascent_fails_for_unauthenticated_user(db, client, problem):
    assert Ascent.objects.count() == 0

    response = client.post(
        reverse("ascents"),
        {
            "problem": problem.id,
            "given_rating": 4,
            "comment": "Yes!",
        },
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert Ascent.objects.count() == 0


def test_get_ascents(db, client, ascent, ascent_other):
    response = client.get(reverse("ascents"))

    assert response.status_code == 200
    assert len(response.data) == 2

    ascent_data = response.data[0]
    assert ascent_data["problem"] == ascent.problem.id
    assert ascent_data["user"] == ascent.user.id
    assert ascent_data["given_rating"] == ascent.given_rating
    assert ascent_data["comment"] == ascent.comment

    ascent_data_other = response.data[1]
    assert ascent_data_other["problem"] == ascent_other.problem.id
    assert ascent_data_other["user"] == ascent_other.user.id
    assert ascent_data_other["given_rating"] == ascent_other.given_rating
    assert ascent_data_other["comment"] == ascent_other.comment


