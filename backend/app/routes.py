'''Provides handlers for api endpoints.'''

from flask import request, jsonify

from app import app
from app.models import Clue


@app.route("/clues", methods=["GET"])
def clues():
    game_id_param = request.args.get("game_id")
    category_param = request.args.get("category")

    clues = None
    if game_id_param is not None:
        clues = Clue.query.filter(Clue.game_id == game_id_param).all()
    elif category_param is not None:
        clues = Clue.query.filter(
            Clue.category == category_param.upper()).all()

    response = jsonify([{
        "id": c.id,
        "game_id": c.game_id,
        "clue_id": c.clue_id,
        "category": c.category,
        "question": c.question,
        "answer": c.answer
    } for c in clues])
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/game_ids", methods=["GET"])
def game_ids():
    '''Fetch all unique game_ids from the db.'''

    game_ids = Clue.query.with_entities(Clue.game_id).distinct().all()
    response = jsonify([game_id[0] for game_id in game_ids])
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/categories", methods=["GET"])
def categories():
    '''Fetch all unique categories from the db.'''

    categories = Clue.query.with_entities(Clue.category).distinct().all()
    response = jsonify([c[0] for c in categories])
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
