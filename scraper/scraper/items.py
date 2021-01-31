# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


def clean(text):
    text = text.strip("()")
    text = ''.join(text)
    return text

def join_text(text):
    text = ''.join(text)
    return text

def test_text(text):
    return text.strip(', ')


class Categories(scrapy.Item):
    game_id = scrapy.Field()
    categories = scrapy.Field()
    category_j_1 = scrapy.Field()
    category_j_2 = scrapy.Field()
    category_j_3 = scrapy.Field()
    category_j_4 = scrapy.Field()
    category_j_5 = scrapy.Field()
    category_j_6 = scrapy.Field()
    category_dj_1 = scrapy.Field()
    category_dj_2 = scrapy.Field()
    category_dj_3 = scrapy.Field()
    category_dj_4 = scrapy.Field()
    category_dj_5 = scrapy.Field()
    category_dj_6 = scrapy.Field()
    category_fj = scrapy.Field()
    category_tb = scrapy.Field()
