import scrapy
from scraper.items import Games
from scrapy.loader import ItemLoader

class GamesSpider(scrapy.Spider):
    name = 'games'

    start_urls = [
        'https://www.j-archive.com/showgame.php?game_id=6821'
        # 'http://www.j-archive.com/showgame.php?game_id=1062',
        # 'http://www.j-archive.com/showgame.php?game_id=6233',
        # 'http://www.j-archive.com/showgame.php?game_id=2775',
        # 'http://www.j-archive.com/showgame.php?game_id=3578',
        # 'http://www.j-archive.com/showgame.php?game_id=1101'
    ]


    def parse(self, response):
        loader = ItemLoader(item = Games(), response=response)
        loader.add_xpath('game_id', '//div[@id = "game_title"]//text()')

        # Scrape the category names.
        categories = response.xpath('//td[@class = "category_name"]').xpath('string()').extract()  
        loader.add_value('category_J_1', categories[0])
        loader.add_value('category_J_2', categories[1])
        loader.add_value('category_J_3', categories[2])
        loader.add_value('category_J_4', categories[3])
        loader.add_value('category_J_5', categories[4])
        loader.add_value('category_J_6', categories[5])
        loader.add_value('category_DJ_1', categories[6])
        loader.add_value('category_DJ_2', categories[7])
        loader.add_value('category_DJ_3', categories[8])
        loader.add_value('category_DJ_4', categories[9])
        loader.add_value('category_DJ_5', categories[10])
        loader.add_value('category_DJ_6', categories[11])
        loader.add_value('category_FJ', categories[12])
        loader.add_value('category_TB', categories[-1])

        # Scrape the clues and answers.
        loader.add_css('clue_ids', 'td.clue_text::attr(id)')
        clues = response.css('td.clue').css('td.clue_text').xpath('string()').extract() 
        loader.add_value('clues', clues)
        jep_item = loader.load_item()
        answers_url = response.xpath('//*[@id="final_jeopardy_round"]/h4/a[1]//@href').get()
        yield response.follow(answers_url, self.parse_answers, meta = {'jep_item': jep_item})

        # TODO: uncomment this when we decide on a link following approach.
        # for a in response.xpath('//a[contains(text(), "next game")]/@href'):
        #     yield response.follow(a, self.parse)

    def parse_answers(self, response):
        jep_item = response.meta['jep_item']
        loader = ItemLoader(item=jep_item, response=response)
        answers = response.xpath('//em[@class = "correct_response"]').xpath('string()').extract()
        loader.add_value('correct_responses', answers)
        yield loader.load_item()
            