'''Populate SQLite DB from JSON Dump

This script parses a JSON file generated by the scrapy project in jeppy/scraper
directory. After cleaning the raw data it writes the resulting Clues to the db.

This file should not be imported as a module, it's meant to be run by a user in
one off situations or as part of a taskfile task.
'''

import json

from app import db
from app.helpers import clean_game_entry
from app.models import Clue

# TODO: while this works, it's a bit wonky. The first call to rollback() will
# behave as expected, but the call to rollback() in the second try/catch is
# essentially a noop. By the time we enter the second try/catch the clue table
# must be empty, so if we hit the except clause we'll just be rolling back to
# an empty table.
#
# Some ideas:
#  - we could commit the db writes in batches which would leave us with a
#    partially populated db if we encounter and exception
#  - we could add a unique constraint or index at the db level and swallow
#    the exceptions related to inserting an existing record (i'm not sure if
#    this is possible in sqlite)

# Delete all existing records from the clue table.
try:
    num_rows_deleted = db.session.query(Clue).delete()
    db.session.commit()
except Exception as e:
    print(e)
    db.session.rollback()
    exit(1)

try:
    # Load the JSON file into a dictionary.
    with open("../data/dump.json") as infile:
        data = json.load(infile)

    # Clean each game entry in the json file and write it to the db.
    for game_entry in data:
        clean_clues = clean_game_entry(game_entry)
        for c in clean_clues:
            db.session.add(c)
    db.session.commit()
except Exception as e:
    print(e)
    db.session.rollback()
