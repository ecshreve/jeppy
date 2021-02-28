import json

from app.helpers import clean_game_entry


def test_clean_game_entry(snapshot):
    with open("tests/testdump.json") as infile:
        data = json.load(infile)
        clues = clean_game_entry(data[0])
        snapshot.assert_match(clues)
