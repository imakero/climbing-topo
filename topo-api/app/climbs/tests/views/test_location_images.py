import os
from django.urls import reverse
from django.test import override_settings

from climbs.models import LocationImage


def compare_location_images(response_location_image, location_image):
    assert response_location_image["id"] == location_image.id
    assert response_location_image["image"].endswith(location_image.image.name)
    assert response_location_image["image_width"] == location_image.image_width
    assert (
        response_location_image["image_height"] == location_image.image_height
    )
    location = response_location_image["location"]
    assert location["id"] == location_image.location.id
    assert location["name"] == location_image.location.name
    assert location["type"] == location_image.location.type


def test_get_location_images(db, client, location_image, location_image_other):
    response = client.get(reverse("location-images"))

    assert response.status_code == 200
    assert len(response.data) == 2

    first_image, second_image = response.data
    compare_location_images(first_image, location_image)
    compare_location_images(second_image, location_image_other)


def test_create_location_image(
    db, client, location, image_file, tmp_media_folder
):
    assert LocationImage.objects.count() == 0

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.post(
            reverse("location-images"),
            data={"location": location.id, "image": image_file},
            format="multipart",
        )

    assert response.status_code == 201
    assert LocationImage.objects.count() == 1

    compare_location_images(response.data, LocationImage.objects.first())

    image_path = tmp_media_folder / "location_images" / image_file.name
    assert image_path.exists()


def test_create_location_image_fails_for_txt_file(
    db, client, location, text_file, tmp_media_folder
):
    assert LocationImage.objects.count() == 0

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.post(
            reverse("location-images"),
            {"location": location.id, "image": text_file},
            format="multipart",
        )

    assert response.status_code == 400
    assert response.data["image"][0].code == "invalid_image"
    assert LocationImage.objects.count() == 0


def test_get_location_image(db, client, location_image):
    response = client.get(reverse("location-image", args=[location_image.id]))

    assert response.status_code == 200
    compare_location_images(response.data, location_image)


def test_update_location_for_location_image(
    db, client, location_image, location_other
):
    response = client.patch(
        reverse("location-image", args=[location_image.id]),
        {"location": location_other.id},
        format="multipart",
    )

    assert response.status_code == 200
    updated_image = LocationImage.objects.get(pk=location_image.id)
    assert updated_image.location == location_other


def test_update_image_for_location_image(
    db, client, location_image, image_file_other, tmp_media_folder
):
    assert LocationImage.objects.count() == 1

    old_image = location_image.image

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.patch(
            reverse("location-image", args=[location_image.id]),
            {"image": image_file_other},
            format="multipart",
        )

        assert response.status_code == 200
        compare_location_images(response.data, LocationImage.objects.first())

        new_image = LocationImage.objects.get(pk=location_image.id).image
        assert os.path.exists(new_image.path)

        assert not os.path.exists(old_image.path)


def test_delete_location_image(db, client, location_image, tmp_media_folder):
    assert LocationImage.objects.count() == 1

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.delete(
            reverse("location-image", args=[location_image.id])
        )

        assert response.status_code == 204
        assert LocationImage.objects.count() == 0
        assert not os.path.exists(location_image.image.path)
