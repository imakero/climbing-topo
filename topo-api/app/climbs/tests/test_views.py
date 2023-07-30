import os
from django.urls import reverse
from django.test import override_settings

from climbs.models import TopoImage


def test_add_topo_image(db, client, climbable, image_file, tmp_media_folder):
    assert len(TopoImage.objects.all()) == 0

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.post(
            reverse("topos"),
            data={"climbable": climbable.id, "image": image_file},
            format="multipart",
        )

    assert response.status_code == 201

    assert len(TopoImage.objects.all()) == 1
    assert response.data["climbable"] == climbable.id
    assert response.data["image"].endswith(image_file.name)

    image_path = tmp_media_folder / "topo_images" / image_file.name
    assert image_path.exists()


def test_add_topo_image_fails_for_txt_file(
    db, client, climbable, text_file, tmp_media_folder
):
    assert len(TopoImage.objects.all()) == 0

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.post(
            reverse("topos"),
            {"climbable": climbable.id, "image": text_file},
            format="multipart",
        )

    assert response.status_code == 400
    assert response.data["image"][0].code == "invalid_image"
    assert len(TopoImage.objects.all()) == 0


def test_list_topo_images(db, client, topo_image, topo_image_other):
    response = client.get(reverse("topos"))

    assert response.status_code == 200
    assert len(response.data) == 2

    first_image, second_image = response.data
    assert first_image["id"] == topo_image.id
    assert first_image["climbable"] == topo_image.climbable.id
    assert first_image["image"].endswith(topo_image.image.name)

    assert second_image["id"] == topo_image_other.id
    assert second_image["climbable"] == topo_image_other.climbable.id
    assert second_image["image"].endswith(topo_image_other.image.name)


def test_get_topo_image(db, client, topo_image):
    response = client.get(reverse("topo", args=[topo_image.id]))

    assert response.status_code == 200
    assert response.data["id"] == topo_image.id
    assert response.data["climbable"] == topo_image.climbable.id
    assert response.data["image"].endswith(topo_image.image.name)


def test_update_climbable_for_topo_image(
    db, client, topo_image, climbable_other
):
    response = client.patch(
        reverse("topo", args=[topo_image.id]),
        {"climbable": climbable_other.id},
        format="multipart",
    )

    assert response.status_code == 200
    assert response.data["id"] == topo_image.id
    assert response.data["climbable"] == climbable_other.id
    assert response.data["image"].endswith(topo_image.image.name)


def test_update_image_for_topo_image(
    db, client, topo_image, image_file_other, tmp_media_folder
):
    assert len(TopoImage.objects.all()) == 1

    old_image = topo_image.image

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.patch(
            reverse("topo", args=[topo_image.id]),
            {"image": image_file_other},
            format="multipart",
        )

        assert response.status_code == 200
        assert response.data["id"] == topo_image.id
        assert response.data["climbable"] == topo_image.climbable.id
        assert response.data["image"].endswith(image_file_other.name)

        new_image = TopoImage.objects.get(pk=topo_image.id).image
        assert os.path.exists(new_image.path)

        assert not os.path.exists(old_image.path)


def test_delete_topo_image(db, client, topo_image, tmp_media_folder):
    assert len(TopoImage.objects.all()) == 1

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.delete(reverse("topo", args=[topo_image.id]))

        assert response.status_code == 204
        assert len(TopoImage.objects.all()) == 0
        assert not os.path.exists(topo_image.image.path)
