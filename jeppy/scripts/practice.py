import logging

from game.database import create_connection
from game.database import get_random_clue

logging.basicConfig(level=logging.INFO)

try:
    conn = create_connection('../data/jeppysqlite.db')

    while True:
        try:
            c = get_random_clue(conn)
            print(c.category)
            print(c.clue)

            user_answer = input("--> ")
            if user_answer == "qq":
                break
            print("### " + c.answer + "\n")
        except Exception as e:
            logging.error(e)
except Exception as e:
    logging.error(e)