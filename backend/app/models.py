'''Provides definitions for database models.'''

from app import db


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

    def __repr__(self):
        ret = ""
        ret += ("game_id: " + self.game_id + "\n")
        ret += ("clue_id: " + self.clue_id + "\n")
        ret += ("category: " + self.category + "\n")
        ret += ("question: " + self.question + "\n")
        ret += ("answer: " + self.answer + "\n")

        return ret
