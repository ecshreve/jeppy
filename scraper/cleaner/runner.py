import json
import logging

import cleaner
import database as db

logging.basicConfig(level=logging.INFO)

conn = db.create_connection('jeppysqlite.db')
if conn:
    db.create_tables(conn)

# Load the JSON file into a dictionary.
with open("../dump.json") as infile:
    data = json.load(infile)

gamenum = 0
for g in data:
    logging.info(gamenum)
    gamenum = gamenum+1
    cg = cleaner.clean_game(g)
    for c in cg.clues:
        db.insert_clue(conn, c)

conn.close()