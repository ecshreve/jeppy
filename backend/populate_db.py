import json

from app import db
from app.models import Clue


def clean_game_entry(raw_game):
    clean_categories = {
        "J_1": raw_game["category_J_1"][0],
        "J_2": raw_game["category_J_2"][0],
        "J_3": raw_game["category_J_3"][0],
        "J_4": raw_game["category_J_4"][0],
        "J_5": raw_game["category_J_5"][0],
        "J_6": raw_game["category_J_6"][0],
        "DJ_1": raw_game["category_DJ_1"][0],
        "DJ_2": raw_game["category_DJ_2"][0],
        "DJ_3": raw_game["category_DJ_3"][0],
        "DJ_4": raw_game["category_DJ_4"][0],
        "DJ_5": raw_game["category_DJ_5"][0],
        "DJ_6": raw_game["category_DJ_6"][0],
        "FJ": raw_game["category_FJ"][0],
        "TB": raw_game["category_TB"][0],
    }

    game_id = raw_game["game_id"][0]
    clues = []
    for index, clue_id in enumerate(raw_game["clue_ids"]):
        tmp_clue_id = clue_id[5:]
        category = clean_categories[tmp_clue_id] if len(
            tmp_clue_id) <= 2 else clean_categories[tmp_clue_id[:-2]]

        c = Clue(
            game_id,
            tmp_clue_id,
            category,
            raw_game["clues"][index],
            raw_game["correct_responses"][index])
        clues.append(c)

    return clues

try:
    num_rows_deleted = db.session.query(Clue).delete()
    print(num_rows_deleted)
    db.session.commit()
except Exception as e:
    print(e)
    db.session.rollback()

try:
    # Load the JSON file into a dictionary.
    with open("../data/dump.json") as infile:
        data = json.load(infile)

    for game_entry in data:
        clean_clues = clean_game_entry(game_entry)
        for c in clean_clues:
            db.session.add(c)
    db.session.commit()
except Exception as e:
    print(e)
    db.session.rollback()
