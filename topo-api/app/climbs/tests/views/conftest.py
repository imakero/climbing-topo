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


