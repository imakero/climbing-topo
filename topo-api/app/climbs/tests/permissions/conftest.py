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
