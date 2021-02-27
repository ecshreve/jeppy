from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jeppy.db"

db = SQLAlchemy(app)


class Clue(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    game_id = db.Column(db.String(255))
    clue_id = db.Column(db.String(255))
    category = db.Column(db.String(255))
    question = db.Column(db.String(255))
    answer = db.Column(db.String(255))

    def __init__(self, game_id, clue_id, category, question, answer):
        self.game_id = game_id
        self.clue_id = clue_id
        self.category = category
        self.question = question
        self.answer = answer


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


@app.route("/game_ids", methods=["GET"])
def game_ids():
    method = request.method
    if (method.lower() == "get"):
        clues = Clue.query.all()
        game_ids = sorted(set([c.game_id for c in clues]))

        response = jsonify(game_ids)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response


if __name__ == "__main__":
    app.run(debug=True)
