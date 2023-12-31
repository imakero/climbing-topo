import copy
from django.urls import reverse
import pytest

from climbs.models import Problem, Tag

PROBLEM_DIRECTLY_COMPARABLE_FIELDS = [
    "id",
    "name",
    "description",
    "grade",
    "ascents",
    "rating",
]


def get_query_params(query_params={}, **kwargs):
    _query_params = copy.deepcopy(query_params)
    for k, v in kwargs.items():
        if v is not None:
            _query_params[k] = v
    return _query_params


def compare_problem(response_problem, problem):
    for field in PROBLEM_DIRECTLY_COMPARABLE_FIELDS:
        assert response_problem[field] == getattr(problem, field)

    location = response_problem["location"]
    assert location["name"] == problem.location.name

    position = location["position"]
    assert position["lon"] == problem.location.position.x
    assert position["lat"] == problem.location.position.y

    x, y = problem.location.position.x, problem.location.position.y
    assert position["google_maps_string"] == f"{y}, {x}"


def test_get_problems(db, client, problem, problem_other, ascent):
    assert Problem.objects.count() == 2

    response = client.get(reverse("problems"))

    assert response.status_code == 200
    assert response.data["count"] == 2

    problems = Problem.objects.with_annotations("ascents", "rating")
    for response_problem, problem in zip(
        response.data["results"],
        problems,
    ):
        compare_problem(response_problem, problem)


def test_create_problem(
    db, client, location, moderator_user, tag_crimpy, tag_slopers
):
    assert Problem.objects.count() == 0

    client.force_authenticate(user=moderator_user)
    response = client.post(
        reverse("problems"),
        {
            "name": "problem1",
            "description": "description",
            "grade": "8A",
            "location": location.id,
            "tags": [tag_crimpy.id, tag_slopers.id],
        },
    )

    assert response.status_code == 201
    assert Problem.objects.count() == 1

    problem = Problem.objects.first()
    assert problem.name == "problem1"
    assert problem.description == "description"
    assert problem.grade == "8A"
    assert problem.location == location
    assert problem.tags.count() == 2
    assert tag_crimpy in problem.tags.all()
    assert tag_slopers in problem.tags.all()


@pytest.mark.parametrize(
    "grade, expected_problems",
    [
        ("8A", [1]),
        ("8A,7C+,7C", [1, 2, 3, 4]),
        ("8a,7c+,7c,6b", [1, 2, 3, 4, 5]),
        ("7C", [4]),
        (None, [1, 2, 3, 4, 5]),
    ],
)
def test_filter_problems_on_grade(
    db, client, location, add_problems, grade, expected_problems
):
    problems = add_problems(
        5, [location] * 5, grades=["8A", "7C+", "7c+", "7C", "6b"]
    )

    response = client.get(
        reverse("problems"),
        get_query_params(grade=grade),
    )

    assert response.status_code == 200
    assert response.data["count"] == len(expected_problems)

    response_ids = set([problem["id"] for problem in response.data["results"]])
    expected_ids = set([problems[i - 1].id for i in expected_problems])

    assert response_ids == expected_ids


@pytest.mark.parametrize(
    "search_term, expected_problem_names",
    [
        ("Janne Bananne", ["Janne Bananne"]),
        ("volt", ["Volt"]),
        ("re", ["Jailbreak", "Underhuggaren", "Ampere"]),
        (
            None,
            [
                "Watchtower",
                "Jailbreak",
                "Underhuggaren",
                "Ampere",
                "Volt",
                "Janne Bananne",
            ],
        ),
        ("WATCH", ["Watchtower"]),
    ],
)
def test_filter_problems_on_name(
    db,
    client,
    problems_with_searchables,
    search_term,
    expected_problem_names,
):
    response = client.get(
        reverse("problems"),
        get_query_params(name=search_term),
    )

    assert response.status_code == 200
    assert response.data["count"] == len(expected_problem_names)

    response_problem_names = set(
        [problem["name"] for problem in response.data["results"]]
    )
    assert response_problem_names == set(expected_problem_names)


@pytest.mark.parametrize(
    "search_term, expected_problems",
    [
        ("knee", [4, 6]),
        ("CL", [1, 2]),
        ("rock", [5]),
        (None, [1, 2, 3, 4, 5, 6]),
        ("climb", [1, 2]),
        ("start lower", [6]),
        ("crimps", []),
    ],
)
def test_filter_problems_on_description(
    db,
    client,
    problems_with_searchables,
    search_term,
    expected_problems,
):
    problems, _ = problems_with_searchables
    response = client.get(
        reverse("problems"), get_query_params(description=search_term)
    )

    assert response.status_code == 200
    assert response.data["count"] == len(expected_problems)

    response_ids = set([problem["id"] for problem in response.data["results"]])
    expected_ids = set([problems[i - 1].id for i in expected_problems])
    assert response_ids == expected_ids


@pytest.mark.parametrize(
    "search_term, expected_problems",
    [
        ("blocket", [4, 5, 6]),
        ("wall", []),
        (None, [1, 2, 3, 4, 5, 6]),
        ("svält", [1, 2, 3]),
    ],
)
def test_filter_problems_on_location_name(
    db,
    client,
    problems_with_searchables,
    search_term,
    expected_problems,
):
    problems, _ = problems_with_searchables

    response = client.get(
        reverse("problems"),
        get_query_params(location=search_term),
    )

    assert response.status_code == 200
    assert response.data["count"] == len(expected_problems)

    response_ids = set([problem["id"] for problem in response.data["results"]])
    expected_ids = set([problems[i - 1].id for i in expected_problems])
    assert response_ids == expected_ids


@pytest.mark.parametrize(
    "search_tags, expected_problems",
    [
        (
            "crimps,slopers",
            set(["problem1", "problem2", "problem3"]),
        ),
        ("crimpy", set([])),
        ("Pinches", set(["problem1"])),
        ("yes,ok,slopers", set(["problem1", "problem2"])),
    ],
)
def test_filter_problems_on_tags(
    db, client, add_problem, add_tag, location, search_tags, expected_problems
):
    assert Problem.objects.count() == 0
    assert Tag.objects.count() == 0

    tag_crimps = add_tag(name="crimps")
    tag_slopers = add_tag(name="slopers")
    tag_pinches = add_tag(name="pinches")
    tag_CRIMPS = add_tag(name="CRIMPS")
    tag_Slopers = add_tag(name="Slopers")

    p1_tags = [tag_crimps, tag_slopers, tag_pinches]
    p2_tags = [tag_crimps, tag_Slopers]
    p3_tags = [tag_CRIMPS]
    p4_tags = []

    for i, tags in enumerate([p1_tags, p2_tags, p3_tags, p4_tags]):
        add_problem(name=f"problem{i+1}", tags=tags, location=location)

    response = client.get(reverse("problems"), data={"tags": f"{search_tags}"})

    assert response.status_code == 200
    assert response.data["count"] == len(expected_problems)

    response_problem_names = set(
        [problem["name"] for problem in response.data["results"]]
    )
    assert response_problem_names == expected_problems


@pytest.mark.parametrize(
    "lon, lat, dist_km, expected_problems",
    [
        # Should only find problem at (0, 0)
        (0, 0, 1, set([1])),
        # Should find all problems if lat or lon is None
        (None, 0, 1, set(range(1, 10))),
        (0, None, 1, set(range(1, 10))),
        (None, None, 1, set(range(1, 10))),
        # Should find all problems
        (0, 0, 10000, set(range(1, 10))),
        # Should find no problems
        (50, 50, 0, set()),
        # Should find problems 5, 6, 8, 9
        (2, 2, 180, set([5, 6, 8, 9])),
        # Should find problems 6, 8, 9
        (2, 2, 140, set([6, 8, 9])),
    ],
)
def test_filter_problems_on_distance(
    db,
    client,
    problems_in_a_grid,
    lon,
    lat,
    dist_km,
    expected_problems,
):
    query_string = get_query_params({"dist_km": dist_km}, lon=lon, lat=lat)

    response = client.get(reverse("problems"), query_string)

    assert response.status_code == 200
    assert response.data["count"] == len(expected_problems)

    response_problem_names = set(
        [problem["name"] for problem in response.data["results"]]
    )
    expected_problem_names = set([f"problem {i}" for i in expected_problems])
    assert response_problem_names == expected_problem_names


@pytest.mark.parametrize(
    "min_rating, max_rating, expected_problems",
    [
        (None, None, [1, 2, 3, 4, 5]),
        (None, 3, [1, 2, 3]),
        (1, 4, [2, 3, 4]),
        (4, None, [4, 5]),
        (4.4, 4.6, []),
        (1.1, 4.6, [2, 3, 4]),
    ],
)
def test_filter_problems_on_rating(
    db,
    client,
    problems_with_rating,
    min_rating,
    max_rating,
    expected_problems,
):
    assert Problem.objects.count() == 5

    response = client.get(
        reverse("problems"),
        get_query_params(min_rating=min_rating, max_rating=max_rating),
    )

    assert response.status_code == 200
    assert response.data["count"] == len(expected_problems)

    response_problem_names = set(
        [problem["name"] for problem in response.data["results"]]
    )
    expected_problem_names = set([f"problem {i}" for i in expected_problems])

    assert response_problem_names == expected_problem_names


@pytest.mark.parametrize(
    "min_ascents, max_ascents, expected_problems",
    [
        (None, None, [1, 2, 3, 4, 5]),
        (None, 3, [1, 2, 3, 4]),
        (1, 4, [2, 3, 4]),
        (4, None, [5]),
        (0, 4, [1, 2, 3, 4]),
        (4, 500, [5]),
    ],
)
def test_filter_problems_on_ascents(
    db,
    client,
    problems_with_ascents,
    min_ascents,
    max_ascents,
    expected_problems,
):
    assert Problem.objects.count() == 5

    response = client.get(
        reverse("problems"),
        get_query_params(min_ascents=min_ascents, max_ascents=max_ascents),
    )

    assert response.status_code == 200
    assert response.data["count"] == len(expected_problems)

    response_problem_names = set(
        [problem["name"] for problem in response.data["results"]]
    )
    expected_problem_names = set([f"problem {i}" for i in expected_problems])

    assert response_problem_names == expected_problem_names


def test_get_problem(db, client, problem):
    response = client.get(reverse("problem", kwargs={"pk": problem.id}))

    assert response.status_code == 200

    problem = Problem.objects.with_annotations("ascents", "rating").get(
        id=problem.id
    )
    compare_problem(response.data, problem)


def test_update_problem(
    db,
    client,
    problem,
    moderator_user,
    location_other,
    tag_crimpy,
    tag_slopers,
):
    client.force_authenticate(user=moderator_user)
    response = client.patch(
        reverse("problem", kwargs={"pk": problem.id}),
        {
            "location": location_other.id,
            "name": "new name",
            "description": "new description",
            "grade": "8A",
            "tags": [tag_crimpy.id],
        },
    )

    assert response.status_code == 200

    problem.refresh_from_db()
    assert problem.name == "new name"
    assert problem.description == "new description"
    assert problem.grade == "8A"
    assert problem.location == location_other
    assert problem.tags.count() == 1
    assert tag_crimpy in problem.tags.all()
    assert tag_slopers not in problem.tags.all()
