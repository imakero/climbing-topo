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


def test_can_get_ascents_without_auth(db, client, ascent, ascent_other):
    assert Ascent.objects.count() == 2

    client.force_authenticate(user=None)
    response = client.get(reverse("ascents"))

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 2


def test_filter_ascents_by_problem(db, client, ascent, ascent_other):
    assert Ascent.objects.count() == 2

    query_params = {"problem": ascent.problem.id}
    response = client.get(
        reverse("ascents"),
        data=query_params,
    )

    assert response.status_code == 200
    assert len(response.data) == 1

    ascent_data = response.data[0]
    assert ascent_data["problem"] == ascent.problem.id
    assert ascent_data["user"] == ascent.user.id
    assert ascent_data["given_rating"] == ascent.given_rating
    assert ascent_data["comment"] == ascent.comment


def test_filter_ascents_by_user(db, client, ascent, ascent_other):
    assert Ascent.objects.count() == 2

    query_params = {"user": ascent.user.id}
    response = client.get(
        reverse("ascents"),
        data=query_params,
    )

    assert response.status_code == 200
    assert len(response.data) == 1

    ascent_data = response.data[0]
    assert ascent_data["problem"] == ascent.problem.id
    assert ascent_data["user"] == ascent.user.id
    assert ascent_data["given_rating"] == ascent.given_rating
    assert ascent_data["comment"] == ascent.comment


def test_get_ascent(db, client, ascent):
    response = client.get(reverse("ascent", kwargs={"pk": ascent.id}))

    assert response.status_code == status.HTTP_200_OK

    ascent_data = response.data
    assert ascent_data["problem"] == ascent.problem.id
    assert ascent_data["user"] == ascent.user.id
    assert ascent_data["given_rating"] == ascent.given_rating
    assert ascent_data["comment"] == ascent.comment


def test_can_get_ascent_without_auth(db, client, ascent):
    client.force_authenticate(user=None)
    response = client.get(reverse("ascents"))

    assert response.status_code == status.HTTP_200_OK


def test_update_ascent(db, client, ascent):
    client.force_authenticate(user=ascent.user)
    response = client.patch(
        reverse("ascent", kwargs={"pk": ascent.id}),
        {"comment": "Updated comment!", "given_rating": 5},
    )

    assert response.status_code == status.HTTP_200_OK

    updated_ascent = Ascent.objects.get(id=ascent.id)
    assert updated_ascent.comment == "Updated comment!"
    assert updated_ascent.given_rating == 5


def test_cannot_update_ascent_problem_or_user(
    db, client, ascent, problem_other, user_other
):
    client.force_authenticate(user=ascent.user)
    response = client.patch(
        reverse("ascent", kwargs={"pk": ascent.id}),
        {"problem": problem_other.id, "user": user_other.id},
    )

    assert response.status_code == status.HTTP_200_OK

    updated_ascent = Ascent.objects.get(id=ascent.id)
    assert updated_ascent.problem != problem_other
    assert updated_ascent.user != user_other


def test_user_cannot_update_ascent_by_other_user(
    db, client, ascent_other, user
):
    client.force_authenticate(user=user)
    response = client.patch(
        reverse("ascent", kwargs={"pk": ascent_other.id}),
        {"comment": "Updated comment!", "given_rating": 5},
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN
    ascent_other.refresh_from_db()
    assert ascent_other.comment != "Updated comment!"
    assert ascent_other.given_rating != 5


def test_delete_ascent(db, client, ascent):
    assert Ascent.objects.count() == 1

    client.force_authenticate(user=ascent.user)
    response = client.delete(reverse("ascent", kwargs={"pk": ascent.id}))

    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert Ascent.objects.count() == 0


def test_user_cannot_delete_ascent_by_other_user(
    db, client, ascent_other, user
):
    client.force_authenticate(user=user)
    response = client.delete(reverse("ascent", kwargs={"pk": ascent_other.id}))

    assert response.status_code == status.HTTP_403_FORBIDDEN
