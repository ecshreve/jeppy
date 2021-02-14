import logging

from game.database import create_connection
from game.database import create_tables

logging.basicConfig(level=logging.INFO)
logging.info("starting to create tables")

try:
    conn = create_connection('../data/jeppysqlite.db')
    if conn:
        create_tables(conn)
    conn.close()
    logging.info("successfully created tables")
except Exception as e:
    logging.error(e)