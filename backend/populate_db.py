import json
import os

from app import db
from app import Clue


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


def populateDB():
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


try:
    # If a db file already exists then we're going to rename it temporarily, then remove
    # it after the db is populated with the new data. If populating with the new data is
    # unsuccessful then we can fallback to old version.
    db_already_exists = False
    if os.path.exists("jeppy.db"):
        db_already_exists = True
        os.rename("jeppy.db", "old_jeppy.db")

    # Create the database and table(s).
    db.create_all()

    # Populate the database with data from the dump.json file.
    populateDB()
except Exception as e:
    print("error populating db")
    print(e)

    if db_already_exists:
        print("...")
        print("reverting to previous db version")

        # If there's a new db file then remove it.
        if os.path.exists("jeppy.db"):
            os.remove("jeppy.db")
        
        # Rename the old db file to correct filename.
        os.rename("old_jeppy.db", "jeppy.db")
        print("done reverting db")
else:
    if db_already_exists:
        os.remove("old_jeppy.db")
    print("successfully populated db")


