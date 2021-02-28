'''Tests for the models module located in the app/ directory.'''

from app.models import Clue


def test_new_clue():
    clue = Clue(
        "#1234 - Some Date",
        "J_1_1",
        "Potpourri",
        "what is my favorite color",
        "red")

    assert clue.game_id == "#1234 - Some Date"
    assert clue.clue_id == "J_1_1"
    assert clue.category == "Potpourri"
    assert clue.question == "what is my favorite color"
    assert clue.answer == "red"
