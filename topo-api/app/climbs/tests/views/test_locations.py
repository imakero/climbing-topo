from django.urls import reverse
from django.contrib.gis.geos.point import Point

from climbs.models import Location


def compare_locations(response_location, location):
    assert response_location["id"] == location.id
    assert response_location["name"] == location.name
    assert response_location["type"] == location.type
    position = response_location["position"]
    x, y = location.position.x, location.position.y
    assert position["lon"] == x
    assert position["lat"] == y
    assert position["google_maps_string"] == f"{y}, {x}"
    assert (
        len(response_location["images"]) == location.locationimage_set.count()
    )

    assert (
        response_location["images"][0]["id"]
        == location.locationimage_set.first().id
    )


def test_get_locations(
    db, client, location, location_other, location_image, location_image_other
):
    assert Location.objects.count() == 2

    response = client.get(reverse("locations"))

    assert response.status_code == 200
    assert len(response.data) == 2

    first_location, second_location = response.data
    compare_locations(first_location, location)
    compare_locations(second_location, location_other)


def test_create_location(db, client, moderator_user):
    assert Location.objects.count() == 0

    client.force_authenticate(user=moderator_user)
    response = client.post(
        reverse("locations"),
        data={
            "name": "Test Location",
            "type": "BL",
            "position": {
                "lon": 1.23456789,
                "lat": 9.87654321,
            },
        },
    )

    assert response.status_code == 201
    assert Location.objects.count() == 1

    location = Location.objects.first()
    assert location.name == "Test Location"
    assert location.type == "BL"

    position = location.position
    assert isinstance(position, Point)
    assert position.x == 1.23456789
    assert position.y == 9.87654321


def test_get_location(db, client, location, location_other, location_image):
    response = client.get(reverse("location", args=[location.id]))

    assert response.status_code == 200
    compare_locations(response.data, location)


def test_update_location(db, client, location, moderator_user):
    client.force_authenticate(user=moderator_user)
    response = client.patch(
        reverse("location", args=[location.id]),
        data={
            "name": "Updated Location Name",
            "type": "WA",
            "position": {
                "lon": 1.1,
                "lat": 2.2,
            },
        },
    )

    assert response.status_code == 200

    location.refresh_from_db()
    assert location.name == "Updated Location Name"
    assert location.type == "WA"
    assert location.position.x == 1.1
    assert location.position.y == 2.2


def test_delete_location(db, client, location, moderator_user):
    assert Location.objects.count() == 1

    client.force_authenticate(user=moderator_user)
    response = client.delete(reverse("location", args=[location.id]))

    assert response.status_code == 204
    assert Location.objects.count() == 0
