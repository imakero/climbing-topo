from django.urls import reverse


def test_can_get_locations_without_auth(db, client):
    response = client.get(reverse("locations"))

    assert response.status_code == 200


def test_regular_user_cannot_create_location(
    db, client, regular_user, location_payload
):
    client.force_authenticate(regular_user)
    response = client.post(
        reverse("locations"),
        data=location_payload,
    )

    assert response.status_code == 403


def test_moderator_can_create_location(
    db, client, moderator_user, location_payload
):
    client.force_authenticate(moderator_user)
    response = client.post(
        reverse("locations"),
        data=location_payload,
    )

    assert response.status_code == 201


def test_can_get_location_without_auth(db, client, location):
    response = client.get(reverse("location", kwargs={"pk": location.id}))

    assert response.status_code == 200


def test_regular_user_cannot_update_location(
    db, client, regular_user, location, location_payload
):
    location_payload["name"] = "Updated Location Name"

    client.force_authenticate(regular_user)
    response = client.patch(
        reverse("location", kwargs={"pk": location.id}),
        data=location_payload,
    )

    assert response.status_code == 403


def test_moderator_can_update_location(
    db, client, moderator_user, location, location_payload
):
    location_payload["name"] = "Updated Location Name"

    client.force_authenticate(moderator_user)
    response = client.patch(
        reverse("location", kwargs={"pk": location.id}),
        data=location_payload,
    )

    assert response.status_code == 200


def test_regular_user_cannot_delete_location(
    db, client, regular_user, location
):
    client.force_authenticate(regular_user)
    response = client.delete(reverse("location", kwargs={"pk": location.id}))

    assert response.status_code == 403


def test_moderator_can_delete_location(db, client, moderator_user, location):
    client.force_authenticate(moderator_user)
    response = client.delete(reverse("location", kwargs={"pk": location.id}))

    assert response.status_code == 204
