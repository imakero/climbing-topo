import pytest


@pytest.fixture
def problems_with_searchables(add_climbables, add_problems):
    climbable_names = ["Svälthammaren", "Traverseblocket", "Campusblocket"]
    climbables = add_climbables(n=len(climbable_names), names=climbable_names)

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
    problem_climbables = [
        climbables[0],
        climbables[0],
        climbables[0],
        climbables[1],
        climbables[1],
        climbables[2],
    ]
    problems = add_problems(
        n=len(problem_names),
        climbables=problem_climbables,
        names=problem_names,
        descriptions=descriptions,
    )
    return problems, climbables


@pytest.fixture
def problems_in_a_grid(create_location, add_climbable, add_problem):
    # One degree of latitude covers about 111 kilometers.
    # One degree of longitude, covers about 111 kilometers at the equator but
    # shrinks to 0 kilometers at the poles

    # Points on a 3x3 grid extending north from the equator
    locations = [create_location(x, y) for x in [0, 1, 2] for y in [0, 1, 2]]
    climbables = [
        add_climbable(name=f"climbable {i+1}", location=location)
        for i, location in enumerate(locations)
    ]
    problems = [
        add_problem(name=f"problem {i+1}", climbable=climbable)
        for i, climbable in enumerate(climbables)
    ]


