import logging
import sqlite3
from sqlite3 import Error


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

def insert_clue(conn, clue):
    try:
        sql = ''' INSERT INTO clues(game_id, clue_id, category, clue, answer)
                    VALUES(?,?,?,?,?) '''
        
        c = (clue.game_id, clue.clue_id, clue.category, clue.clue, clue.answer)
        cur = conn.cursor()
        cur.execute(sql, c)
        conn.commit()
    except Error as e:
        logging.warning(str(e) + " -- " + clue.game_id + " -- " + clue.clue_id)