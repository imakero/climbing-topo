from django.urls import reverse

from climbs.models import Problem


def test_can_get_problems_without_auth(db, client, problem, problem_other):
    assert Problem.objects.count() == 2

    response = client.get(reverse("problems"))

    assert response.status_code == 200
    assert response.data["count"] == 2


def test_regular_user_cannot_create_problems(
    db, client, location, regular_user
):
    assert Problem.objects.count() == 0

    client.force_authenticate(user=regular_user)
    response = client.post(
        reverse("problems"),
        {
            "name": "problem1",
            "description": "description",
            "grade": "8A",
            "location": location.id,
        },
    )

    assert response.status_code == 403
    assert Problem.objects.count() == 0


def test_moderator_user_can_create_problems(
    db, client, location, moderator_user
):
    assert Problem.objects.count() == 0

    client.force_authenticate(user=moderator_user)
    response = client.post(
        reverse("problems"),
        {
            "name": "problem1",
            "description": "description",
            "grade": "8A",
            "location": location.id,
            "tags": [],
        },
    )

    assert response.status_code == 201
    assert Problem.objects.count() == 1


def test_can_get_problem_without_auth(db, client, problem):
    response = client.get(reverse("problem", kwargs={"pk": problem.id}))

    assert response.status_code == 200
    assert response.data["id"] == problem.id


def test_regular_user_cannot_update_problem(db, client, regular_user, problem):
    client.force_authenticate(user=regular_user)
    response = client.patch(
        reverse("problem", kwargs={"pk": problem.id}),
        {
            "name": "new name",
        },
    )

    assert response.status_code == 403

    problem.refresh_from_db()
    assert problem.name != "new name"


def test_moderator_user_can_update_problem(
    db, client, moderator_user, problem
):
    client.force_authenticate(user=moderator_user)
    response = client.patch(
        reverse("problem", kwargs={"pk": problem.id}),
        {
            "name": "new name",
        },
    )

    assert response.status_code == 200

    problem.refresh_from_db()
    assert problem.name == "new name"


def test_moderator_user_can_delete_problem(
    db, client, problem, moderator_user
):
    client.force_authenticate(user=moderator_user)
    response = client.delete(reverse("problem", kwargs={"pk": problem.id}))

    assert response.status_code == 204
    assert Problem.objects.count() == 0


def test_regular_user_cannot_delete_problem(db, client, problem, regular_user):
    client.force_authenticate(user=regular_user)
    response = client.delete(reverse("problem", kwargs={"pk": problem.id}))

    assert response.status_code == 403
    assert Problem.objects.count() == 1
