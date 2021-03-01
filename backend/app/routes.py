'''Provides handlers for api endpoints.'''

from flask import request, jsonify

from app import app
from app import db
from app.models import Clue
from app.models import CustomClue


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


@app.route("/custom/clues", methods=['GET', 'POST'])
def custom_clues():
    '''Handler for the /custom/clues endpoint

    GET returns all CustomClues in the db.
    POST accepts a JSON body and creates a CustomClue in the db.

    Example cURL request for testing:
        curl -X POST \
        http://localhost:5000/custom/clues \
        -H 'Content-Type: application/json' \
        -d '{
            "category": "test cat",
            "question": "test question",
            "answer": "test answer"
        }'
    '''

    response = None
    method = request.method
    if (method.lower() == "get"):
        clues = CustomClue.query.all()
        response = jsonify([{
            "id": c.id,
            "category": c.category,
            "question": c.question,
            "answer": c.answer
        } for c in clues])
        response.headers.add("Access-Control-Allow-Origin", "*")
    elif (method.lower() == "post"):
        category = request.json.get("category", None)
        question = request.json.get("question", None)
        answer = request.json.get("answer", None)

        # TODO: input validation and error handling
        response_message = "success"
        try:
            cc = CustomClue(category, question, answer)
            db.session.add(cc)
            db.session.commit()
        except Exception as e:
            print(e)
            db.session.rollback()
            response_message = "failure"

        response = jsonify([{"message": response_message}])
        response.headers.add("Access-Control-Allow-Origin", "*")

    return response
