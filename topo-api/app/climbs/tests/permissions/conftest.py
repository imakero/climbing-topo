import pytest


@pytest.fixture
def location_payload():
    return {
        "name": "Test Location",
        "type": "BL",
        "position": {
            "lon": 1.23456789,
            "lat": 9.87654321,
        },
    }


@pytest.fixture
def line_payload(problem, location_image):
    return {
        "location_image": location_image.id,
        "problem": problem.id,
        "points": {
            "type": "LineString",
            "coordinates": [[1, 2], [3, 4]],
        },
    }
