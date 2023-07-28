from django.urls import reverse
from django.test import override_settings

from climbs.models import TopoImage


def test_add_topo_image(db, client, climbable, image_file, tmp_media_folder):
    assert len(TopoImage.objects.all()) == 0

    with override_settings(MEDIA_ROOT=tmp_media_folder):
        response = client.post(
            reverse("topos"),
            {"climbable": climbable.id, "image": image_file},
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


def test_list_topo_images(db, client, topo_image_1, topo_image_2):
    response = client.get(reverse("topos"))

    assert response.status_code == 200
    assert len(response.data) == 2

    first_image, second_image = response.data
    assert first_image["id"] == topo_image_1.id
    assert first_image["climbable"] == topo_image_1.climbable.id
    assert first_image["image"].endswith(topo_image_1.image.name)

    assert second_image["id"] == topo_image_2.id
    assert second_image["climbable"] == topo_image_2.climbable.id
    assert second_image["image"].endswith(topo_image_2.image.name)
