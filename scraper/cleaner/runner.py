import json
import cleaner

# Load the JSON file into a dictionary.
with open("../dump.json") as infile:
    data = json.load(infile)

for g in data:
    cg = cleaner.clean_game(g)
    print(cg)
    print("\n\n\n---\n\n\n")