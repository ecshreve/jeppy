from flask import request, jsonify

from app import app
from app.models import Clue

@app.route("/clues", methods=["GET"])
def clues():
    game_id_param = request.args.get("game_id")
    method = request.method
    if (method.lower() == "get"):
        clues = Clue.query.filter(Clue.game_id == game_id_param).all()
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