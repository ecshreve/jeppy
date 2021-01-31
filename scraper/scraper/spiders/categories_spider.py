import scrapy
from scraper.items import Categories
from scrapy.loader import ItemLoader

class CategoriesSpider(scrapy.Spider):
    name = 'categories'

    start_urls = [
        'http://www.j-archive.com/showgame.php?game_id=1062'
        # 'http://www.j-archive.com/showgame.php?game_id=6233',
        # 'http://www.j-archive.com/showgame.php?game_id=2775',
        # 'http://www.j-archive.com/showgame.php?game_id=3578',
        # 'http://www.j-archive.com/showgame.php?game_id=1101'
    ]


    def parse(self, response):
        loader = ItemLoader(item = Categories(), response=response)
        loader.add_xpath('game_id', '//div[@id = "game_title"]//text()')
        categories = response.xpath('//td[@class = "category_name"]').xpath('string()').extract()  
        loader.add_value('category_j_1', categories[0])
        loader.add_value('category_j_2', categories[1])
        loader.add_value('category_j_3', categories[2])
        loader.add_value('category_j_4', categories[3])
        loader.add_value('category_j_5', categories[4])
        loader.add_value('category_j_6', categories[5])
        loader.add_value('category_dj_1', categories[6])
        loader.add_value('category_dj_2', categories[7])
        loader.add_value('category_dj_3', categories[8])
        loader.add_value('category_dj_4', categories[9])
        loader.add_value('category_dj_5', categories[10])
        loader.add_value('category_dj_6', categories[11])
        loader.add_value('category_fj', categories[12])
        loader.add_value('category_tb', categories[-1])

        yield loader.load_item()

        # TODO: uncomment this when we decide on a link following approach.
        # for a in response.xpath('//a[contains(text(), "next game")]/@href'):
        #     yield response.follow(a, self.parse)


            