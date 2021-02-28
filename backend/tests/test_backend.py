from app.helpers import parse_raw_game_id


def test_parse_raw_game_id():
    assert parse_raw_game_id("Show #3966 - Monday, November 26, 2001") == ('3966', 'Monday, November 26, 2001')
