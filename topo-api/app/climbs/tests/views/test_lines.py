from django.urls import reverse
from django.contrib.gis.geos.linestring import LineString

from climbs.models import Line


def compare_line(response_line, line):
    assert response_line["id"] == line.id
    assert response_line["location_image"] == line.location_image.id
    assert response_line["problem"] == line.problem.id

    points = response_line["points"]

    assert points["type"] == "LineString"

    coordinates = points["coordinates"]
    for (x1, y1), (x2, y2) in zip(coordinates, line.points.coords):
        assert x1 == x2
        assert y1 == y2


def test_get_lines(
    db, client, line, line_other, location_image, location_image_other
):
    assert Line.objects.count() == 2

    response = client.get(reverse("lines"))

    assert response.status_code == 200
    assert response.data["count"] == 2

    first_line, second_line = response.data["results"]
    compare_line(first_line, line)
    compare_line(second_line, line_other)


def test_create_line(db, client, moderator_user, location_image, problem):
    assert Line.objects.count() == 0

    client.force_authenticate(user=moderator_user)
    response = client.post(
        reverse("lines"),
        data={
            "location_image": location_image.id,
            "problem": problem.id,
            "points": {
                "type": "LineString",
                "coordinates": [[1, 2], [3, 4]],
            },
        },
    )

    assert response.status_code == 201
    assert Line.objects.count() == 1

    line = Line.objects.first()
    assert line.location_image == location_image
    assert line.problem == problem
    assert line.points.coords == ((1, 2), (3, 4))


def test_get_line(db, client, line):
    response = client.get(reverse("line", kwargs={"pk": line.id}))

    assert response.status_code == 200
    compare_line(response.data, line)


def test_update_line(db, client, moderator_user, line, problem_other):
    client.force_authenticate(user=moderator_user)
    response = client.patch(
        reverse("line", kwargs={"pk": line.id}),
        data={
            "problem": problem_other.id,
            "points": {
                "type": "LineString",
                "coordinates": [[5, 6], [7, 8]],
            },
        },
    )

    assert response.status_code == 200

    line.refresh_from_db()
    assert line.problem == problem_other
    assert line.points.coords == ((5, 6), (7, 8))


def test_cannot_update_location_image(
    db, client, moderator_user, line, location_image_other
):
    client.force_authenticate(user=moderator_user)
    response = client.patch(
        reverse("line", kwargs={"pk": line.id}),
        data={
            "location_image": location_image_other.id,
        },
    )

    assert response.status_code == 200

    line.refresh_from_db()
    assert line.location_image != location_image_other


def test_delete_line(db, client, line, moderator_user):
    assert Line.objects.count() == 1

    client.force_authenticate(user=moderator_user)
    response = client.delete(reverse("line", kwargs={"pk": line.id}))

    assert response.status_code == 204
    assert Line.objects.count() == 0
