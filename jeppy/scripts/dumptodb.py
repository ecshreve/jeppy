import json
import logging

from app.cleaner import clean_game
from app.database import create_connection
from app.database import insert_clue

logging.basicConfig(level=logging.INFO)
logging.info("starting to populate tables")

try:
    conn = create_connection('../data/jeppysqlite.db')

    # Load the JSON file into a dictionary.
    with open("../data/dump.json") as infile:
        data = json.load(infile)

    for g in data:
        cg = clean_game(g)
        for c in cg.clues:
            insert_clue(conn, c)

    conn.close()
    logging.info("successfully populated tables")
except Exception as e:
    logging.error(e)
