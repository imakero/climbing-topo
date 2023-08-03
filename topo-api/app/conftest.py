import io
import random

import pytest
from PIL import Image

from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.gis.geos import fromstr

from rest_framework.test import APIClient

from activities.models import Ascent
from climbs.models import Climbable, Problem, Tag
from users.models import User


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def add_user():
    def _add_user(**kwargs):
        return User.objects.create_user(**kwargs)

    return _add_user


@pytest.fixture
def add_users(add_user):
    def _add_users(n):
        return [
            add_user(
                username=f"user {i+1}",
                email=f"user_{i+1}@example.com",
            )
            for i in range(n)
        ]

    return _add_users


@pytest.fixture
def user(add_user):
    return add_user(
        username="testuser", password="testpass", email="testuser@example.com"
    )


@pytest.fixture
def user_other(add_user):
    return add_user(
        username="testuser_other",
        password="testpass_other",
        email="testuser_other@example.com",
    )


@pytest.fixture
def admin_user(add_user):
    return add_user(
        username="adminuser",
        password="adminpass",
        is_staff=True,
        is_superuser=True,
    )


@pytest.fixture
def create_location():
    def _create_location(lon, lat):
        return fromstr(f"POINT({lon} {lat})", srid=4326)

    return _create_location


@pytest.fixture
def location(create_location):
    return create_location(17.3728775782919, 59.77591805596081)


@pytest.fixture
def location_other(create_location):
    return create_location(17.401228, 59.940783)


@pytest.fixture
def add_climbable():
    def _add_climbable(**kwargs):
        return Climbable.objects.create(**kwargs)

    return _add_climbable


@pytest.fixture
def add_climbables(add_climbable, create_location):
    def _add_climbables(n, names=None, locations=None, types=None):
        climbables = []
        for i in range(n):
            params = {}
            if names is not None:
                params["name"] = names[i]
            if locations is not None:
                params["location"] = locations[i]
            if types is not None:
                params["type"] = types[i]
            climbables.append(
                add_climbable(
                    location=create_location(
                        random.uniform(-180, 180), random.uniform(-90, 90)
                    ),
                    **params,
                )
            )
        return climbables

    return _add_climbables


@pytest.fixture
def climbable(add_climbable, location):
    return add_climbable(name="Svälthammaren", type="BL", location=location)


@pytest.fixture
def climbable_other(add_climbable, location_other):
    return add_climbable(
        name="Traversblocket", type="BL", location=location_other
    )


@pytest.fixture
def add_tag():
    def _add_tag(**kwargs):
        return Tag.objects.create(**kwargs)

    return _add_tag


@pytest.fixture
def tag_crimpy(add_tag):
    return add_tag(name="crimpy")


@pytest.fixture
def tag_slopers(add_tag):
    return add_tag(name="slopers")


@pytest.fixture
def add_problem():
    def _add_problem(**kwargs):
        if "tags" in kwargs:
            tags = kwargs.pop("tags")
            problem = Problem.objects.create(**kwargs)
            problem.tags.set(tags)
            return problem
        return Problem.objects.create(**kwargs)

    return _add_problem


@pytest.fixture
def add_problems(add_problem):
    def _add_problems(
        n, climbables, grades=None, descriptions=None, tags=None, names=None
    ):
        problems = []
        for i in range(n):
            params = {"name": f"problem {i+1}", "climbable": climbables[i]}
            if grades is not None:
                params["grade"] = grades[i]
            if descriptions is not None:
                params["description"] = descriptions[i]
            if tags is not None:
                params["tags"] = tags[i]
            if names is not None:
                params["name"] = names[i]

            problems.append(add_problem(**params))
        return problems

    return _add_problems


@pytest.fixture
def problem(add_problem, climbable, tag_crimpy, tag_slopers):
    return add_problem(
        climbable=climbable,
        name="Watchtower",
        description="Classic testpiece!",
        grade="7C",
        tags=[tag_crimpy, tag_slopers],
    )


@pytest.fixture
def problem_other(add_problem, climbable_other, tag_crimpy, tag_slopers):
    return add_problem(
        climbable=climbable_other,
        name="Ampere",
        description="Might be soft with the kneebar beta?",
        grade="8A",
        tags=[tag_crimpy],
    )


@pytest.fixture
def image_file():
    image = Image.new("RGB", size=(100, 100), color=(255, 0, 0))
    image_file = io.BytesIO()
    image.save(image_file, format="JPEG")
    image_file.seek(0)

    return SimpleUploadedFile(
        "test_image.jpg", image_file.read(), content_type="image/jpeg"
    )


@pytest.fixture
def image_file_other():
    image = Image.new("RGB", size=(100, 100), color=(0, 255, 0))
    image_file = io.BytesIO()
    image.save(image_file, format="JPEG")
    image_file.seek(0)

    return SimpleUploadedFile(
        "test_image_other.jpg", image_file.read(), content_type="image/jpeg"
    )


@pytest.fixture
def text_file():
    return SimpleUploadedFile(
        "test_file.txt", b"file contents", content_type="text/plain"
    )


@pytest.fixture
def add_ascent():
    def _add_ascent(**kwargs):
        return Ascent.objects.create(**kwargs)

    return _add_ascent


@pytest.fixture
def ascent(add_ascent, problem, user):
    return add_ascent(
        problem=problem, user=user, given_rating=4, comment="Yes!"
    )


@pytest.fixture
def ascent_other(add_ascent, problem_other, user_other):
    return add_ascent(
        problem=problem_other, user=user_other, given_rating=3, comment="Knee!"
    )
