import pytest


@pytest.fixture
def problems_with_searchables(add_locations, add_problems):
    location_names = ["Svälthammaren", "Traverseblocket", "Campusblocket"]
    locations = add_locations(n=len(location_names), names=location_names)

    problem_names = [
        "Watchtower",
        "Jailbreak",
        "Underhuggaren",
        "Ampere",
        "Volt",
        "Janne Bananne",
    ]
    descriptions = [
        "A classic climb",
        "Fun climbing",
        "Easiest way up",
        "Kneebar on hand",
        "Mad rock",
        "Start lower with a knee",
    ]
    problem_locations = [
        locations[0],
        locations[0],
        locations[0],
        locations[1],
        locations[1],
        locations[2],
    ]
    problems = add_problems(
        n=len(problem_names),
        locations=problem_locations,
        names=problem_names,
        descriptions=descriptions,
    )
    return problems, locations


@pytest.fixture
def problems_in_a_grid(create_position, add_location, add_problem):
    # One degree of latitude covers about 111 kilometers.
    # One degree of longitude, covers about 111 kilometers at the equator but
    # shrinks to 0 kilometers at the poles

    # Points on a 3x3 grid extending north from the equator
    positions = [create_position(x, y) for x in [0, 1, 2] for y in [0, 1, 2]]
    locations = [
        add_location(name=f"location {i+1}", position=position)
        for i, position in enumerate(positions)
    ]
    problems = [
        add_problem(name=f"problem {i+1}", location=location)
        for i, location in enumerate(locations)
    ]


@pytest.fixture
def problems_with_rating(add_ascent, add_locations, add_problems, add_users):
    locations = add_locations(5)
    problems = add_problems(5, locations)
    users = add_users(5)

    # Let problem 1 have no rated ascents, rating = None
    add_ascent(user=users[0], problem=problems[0], given_rating=None)
    add_ascent(user=users[1], problem=problems[0], given_rating=None)
    add_ascent(user=users[2], problem=problems[0], given_rating=None)

    # Let problem 2 have one ascent with rating 2, rating = 2.0
    add_ascent(user=users[0], problem=problems[1], given_rating=2)

    # Let problem 3 have two ascents with rating 2 and 4, rating = 3.0
    add_ascent(user=users[0], problem=problems[2], given_rating=2)
    add_ascent(user=users[1], problem=problems[2], given_rating=4)

    # Let problem 4 have three ascents but only one rated ascent with rating 4, rating = 4.0
    add_ascent(user=users[0], problem=problems[3], given_rating=4)
    add_ascent(user=users[1], problem=problems[3], given_rating=None)
    add_ascent(user=users[2], problem=problems[3], given_rating=None)

    # Let problem 5 have three ascents all rated 5, rating = 5.0
    add_ascent(user=users[0], problem=problems[4], given_rating=5)
    add_ascent(user=users[1], problem=problems[4], given_rating=5)
    add_ascent(user=users[2], problem=problems[4], given_rating=5)


@pytest.fixture
def problems_with_ascents(add_ascent, add_locations, add_problems, add_users):
    locations = add_locations(5)
    problems = add_problems(5, locations)
    users = add_users(5)

    # Let problem 1 have no ascents
    # Let problem 2 have one ascent
    add_ascent(user=users[0], problem=problems[1])

    # Let problem 3 have two ascents
    add_ascent(user=users[0], problem=problems[2])
    add_ascent(user=users[1], problem=problems[2])

    # Let problem 4 have three ascents
    add_ascent(user=users[0], problem=problems[3])
    add_ascent(user=users[1], problem=problems[3])
    add_ascent(user=users[2], problem=problems[3])

    # Let problem 5 have five ascents
    add_ascent(user=users[0], problem=problems[4])
    add_ascent(user=users[1], problem=problems[4])
    add_ascent(user=users[2], problem=problems[4])
    add_ascent(user=users[3], problem=problems[4])
    add_ascent(user=users[4], problem=problems[4])
