import logging

import database as db

logging.basicConfig(level=logging.INFO)

conn = db.create_connection('jeppysqlite.db')

while True:
    try:
        c = db.get_random_clue(conn)
        print(c.category)
        print(c.clue)

        user_answer = input("--> ")
        if user_answer == "qq":
            break
        print("### " + c.answer + "\n")
    except Exception as e:
        logging.error(e)