# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class Games(scrapy.Item):
    game_id = scrapy.Field()
    
    categories = scrapy.Field()
    category_J_1 = scrapy.Field()
    category_J_2 = scrapy.Field()
    category_J_3 = scrapy.Field()
    category_J_4 = scrapy.Field()
    category_J_5 = scrapy.Field()
    category_J_6 = scrapy.Field()
    category_DJ_1 = scrapy.Field()
    category_DJ_2 = scrapy.Field()
    category_DJ_3 = scrapy.Field()
    category_DJ_4 = scrapy.Field()
    category_DJ_5 = scrapy.Field()
    category_DJ_6 = scrapy.Field()
    category_FJ = scrapy.Field()
    category_TB = scrapy.Field()

    clue_ids = scrapy.Field()
    clues = scrapy.Field()
    correct_responses = scrapy.Field()
