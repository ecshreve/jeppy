from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jeppy.db"

db = SQLAlchemy(app)
class Clue(db.Model):
    id = db.Column('id', db.Integer, primary_key = True)
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

@app.route('/')
def index():
    return "Hello, world!"

if __name__ == "__main__":
    app.run(debug=True)