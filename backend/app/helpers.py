# TODO: input validation
def parse_raw_game_id(raw_game_id):
    tmp_split = raw_game_id.split(" - ")

    gid = tmp_split[0][6:]
    date = tmp_split[1]

    return (gid, date)

