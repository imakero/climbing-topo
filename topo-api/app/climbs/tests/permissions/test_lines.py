from django.urls import reverse


def test_can_get_lines_without_auth(db, client):
    response = client.get(reverse("lines"))

    assert response.status_code == 200


def test_regular_user_cannot_create_line(
    db, client, regular_user, line_payload
):
    client.force_authenticate(regular_user)
    response = client.post(reverse("lines"), data=line_payload)

    assert response.status_code == 403


def test_moderator_can_create_line(db, client, moderator_user, line_payload):
    client.force_authenticate(moderator_user)
    response = client.post(reverse("lines"), data=line_payload)

    assert response.status_code == 201


def test_can_get_line_without_auth(db, client, line):
    response = client.get(reverse("line", kwargs={"pk": line.id}))

    assert response.status_code == 200


def test_regular_user_cannot_update_line(
    db, client, regular_user, line, line_payload
):
    line_payload["points"]["coordinates"] = [[5, 6], [7, 8]]

    client.force_authenticate(regular_user)
    response = client.patch(
        reverse("line", kwargs={"pk": line.id}),
        data=line_payload,
    )

    assert response.status_code == 403


def test_moderator_can_update_line(
    db, client, moderator_user, line, line_payload
):
    line_payload["points"]["coordinates"] = [[5, 6], [7, 8]]

    client.force_authenticate(moderator_user)
    response = client.patch(
        reverse("line", kwargs={"pk": line.id}),
        data=line_payload,
    )

    assert response.status_code == 200


def test_regular_user_cannot_delete_line(db, client, regular_user, line):
    client.force_authenticate(regular_user)
    response = client.delete(reverse("line", kwargs={"pk": line.id}))

    assert response.status_code == 403


def test_moderator_can_delete_line(db, client, moderator_user, line):
    client.force_authenticate(moderator_user)
    response = client.delete(reverse("line", kwargs={"pk": line.id}))

    assert response.status_code == 204
