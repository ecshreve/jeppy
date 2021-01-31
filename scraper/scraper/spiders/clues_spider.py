import scrapy
from scraper.items import Clues
from scrapy.loader import ItemLoader

class CluesSpider(scrapy.Spider):
    name = 'clues'

    start_urls = [
        'http://www.j-archive.com/showgame.php?game_id=1062'
        # 'http://www.j-archive.com/showgame.php?game_id=6233',
        # 'http://www.j-archive.com/showgame.php?game_id=2775',
        # 'http://www.j-archive.com/showgame.php?game_id=3578',
        # 'http://www.j-archive.com/showgame.php?game_id=1101'
    ]
    
    def parse(self, response):
        loader = ItemLoader(item = Clues(), response=response)
        loader.add_xpath('game_id', '//div[@id = "game_title"]//text()')
        loader.add_css('value', 'td.clue_value::text,td.clue_value_daily_double::text')
        loader.add_value('value', 'FJ')
        order_number = response.css('td.clue_order_number').css('a::text').extract()
        loader.add_value('order_number', order_number)
        loader.add_value('order_number', "FJ")
        loader.add_css('clue_id', 'td.clue_text::attr(id)')
        clue = response.css('td.clue').css('td.clue_text').xpath('string()').extract() 
        loader.add_value('clue', clue)
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
        loader.add_value('correct_response', answers)
        yield loader.load_item()