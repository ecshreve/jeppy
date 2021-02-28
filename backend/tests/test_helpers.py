'''Tests for the helpers module located in the app/ directory.'''

import json

from app.helpers import clean_game_entry
from app.helpers import parse_raw_game_id


def test_clean_game_entry(snapshot):
    with open("tests/testdump.json") as infile:
        data = json.load(infile)
        clues = clean_game_entry(data[0])
        snapshot.assert_match(clues)


def test_parse_raw_game_id():
    assert parse_raw_game_id(
        "Show #3966 - Monday, November 26, 2001") == ('3966', 'Monday, November 26, 2001')
