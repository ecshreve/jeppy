# -*- coding: utf-8 -*-
import json
import pprint
import unicodedata

class Clue:
    def __init__(self, clue_id, clue, correct_response, category):
        self.clue_id = clue_id.encode("utf-8")
        self.category = category.encode("utf-8")
        self.clue = clue.encode("utf-8")
        self.correct_response = correct_response.encode("utf-8")

    def __repr__(self):
        return ("\n\n" + self.clue_id + " -- " + self.category + "\n" + self.clue + "\n" + "--> " + self.correct_response)

class Game:
    def __init__(self, game_id, clues):
        self.game_id = game_id
        self.clues = clues

    def __repr__(self):
        return self.game_id + "\n" + repr(self.clues)

def clean_game(raw_game):
    clean_categories = {
        "J_1": raw_game["category_J_1"][0],
        "J_2": raw_game["category_J_2"][0],
        "J_3": raw_game["category_J_3"][0],
        "J_4": raw_game["category_J_4"][0],
        "J_5": raw_game["category_J_5"][0],
        "J_6": raw_game["category_J_6"][0],
        "DJ_1": raw_game["category_DJ_1"][0],
        "DJ_2": raw_game["category_DJ_2"][0],
        "DJ_3": raw_game["category_DJ_3"][0],
        "DJ_4": raw_game["category_DJ_4"][0],
        "DJ_5": raw_game["category_DJ_5"][0],
        "DJ_6": raw_game["category_DJ_6"][0],
        "FJ": raw_game["category_FJ"][0],
        "TB": raw_game["category_TB"][0],
    }

    clues = []
    for index, clue_id in enumerate(raw_game["clue_ids"]):
        tmp_clue_id = clue_id[5:]
        category = clean_categories[tmp_clue_id] if len(tmp_clue_id) <= 2 else clean_categories[tmp_clue_id[:-2]]
        
        c = Clue(tmp_clue_id, raw_game["clues"][index], raw_game["correct_responses"][index], category)
        clues.append(c)

    g = Game(raw_game["game_id"][0].encode("utf-8"), clues)
    return g


# Load the JSON file into a dictionary.
with open("../dump.json") as infile:
    data = json.load(infile)

for g in data:
    cg = clean_game(g)
    print(cg)
    print("\n\n\n---\n\n\n")