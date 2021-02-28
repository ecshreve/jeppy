from app.models import Clue


def clean_game_entry(raw_game):
    '''Takes in a raw game entry and returns the cleaned list of Clues.'''

    # Build a list of string keys representing each category.
    #  J_<NUM>: single jeopardy
    #  DJ_<NUM>: double jeopardy
    #  FJ: final jeopardy
    #  TB: tie break (this is rare)
    cat_keys = []
    for i in range(1, 7):
        cat_keys.extend(["J_" + str(i), "DJ_" + str(i)])
    cat_keys.extend(["FJ", "TB"])

    # Fetch the category names from the raw_game.
    clean_categories = {x: raw_game["category_" + str(x)][0] for x in cat_keys}

    # Build a list of Clues from the raw_game.
    game_id = raw_game["game_id"][0]
    clues = []
    for index, clue_id in enumerate(raw_game["clue_ids"]):
        clean_clue_id = clue_id[5:]
        category = clean_categories[clean_clue_id] if len(
            clean_clue_id) <= 2 else clean_categories[clean_clue_id[:-2]]

        c = Clue(
            game_id,
            clean_clue_id,
            category,
            raw_game["clues"][index],
            raw_game["correct_responses"][index])
        clues.append(c)

    return clues


# TODO: input validation
def parse_raw_game_id(raw_game_id):
    tmp_split = raw_game_id.split(" - ")

    gid = tmp_split[0][6:]
    date = tmp_split[1]

    return (gid, date)
