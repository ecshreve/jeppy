import logging
import random
import sqlite3
from sqlite3 import Error

import clue as cc


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

def create_table(conn, table_def):
    """ create a table from the table_def statement """
    try:
        c = conn.cursor()
        c.execute(table_def)
    except Error as e:
        print(e)

def create_tables(conn):
    sql_game_table = """ CREATE TABLE IF NOT EXISTS games (
                            id integer PRIMARY KEY,
                            game_id VARCHAR(255)
                        );"""
    create_table(conn, sql_game_table)

    sql_clues_table = """ CREATE TABLE IF NOT EXISTS clues (
                            id integer PRIMARY KEY,
                            game_id TEXT,
                            clue_id TEXT,
                            category TEXT,
                            clue TEXT,
                            answer TEXT,
                            UNIQUE(game_id, clue_id)
                        );"""
    create_table(conn, sql_clues_table)

# TODO: input validation
def insert_clue(conn, clue):
    """ insert a Clue into the database """
    try:
        sql = ''' INSERT INTO clues(game_id, clue_id, category, clue, answer)
                    VALUES(?,?,?,?,?) '''
        
        c = (clue.game_id, clue.clue_id, clue.category, clue.clue, clue.answer)
        cur = conn.cursor()
        cur.execute(sql, c)
        conn.commit()
    except Error as e:
        logging.warning(str(e) + " -- " + clue.game_id + " -- " + clue.clue_id)

def get_random_clue(conn):
    """ fetch a Clue at random from the database """
    cur = conn.cursor()

    cur.execute("SELECT MIN(id) FROM clues")
    min_id = cur.fetchone()[0]

    cur.execute("SELECT MAX(id) FROM clues")
    max_id = cur.fetchone()[0]

    rand_id = random.randint(min_id, max_id)

    # TODO: there's probably a better way to do this
    cur.execute("SELECT * FROM clues WHERE id=?", (rand_id,))
    rand_clue = cur.fetchone()

    clean_clue = cc.Clue(rand_clue[1], rand_clue[2], rand_clue[3], rand_clue[4], rand_clue[5])
    print(clean_clue)