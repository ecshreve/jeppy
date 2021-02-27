from .context import helpers


def test_parse_raw_game_id():
    assert helpers.parse_raw_game_id("Show #3966 - Monday, November 26, 2001") == ('3966', 'Monday, November 26, 2001')
