class Clue:
    def __init__(self, game_id, clue_id, category, clue, answer):
        self.game_id = game_id
        self.clue_id = clue_id
        self.category = category
        self.clue = clue
        self.answer = answer

    def __repr__(self):
        return ("\n\n" + self.game_id + " -- " + self.clue_id + " -- " + self.category + "\n" + self.clue + "\n" + "--> " + self.answer)

class Game:
    def __init__(self, game_id, clues):
        self.game_id = game_id
        self.clues = clues

    def __repr__(self):
        return self.game_id + "\n" + repr(self.clues)