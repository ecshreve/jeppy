scrape:
	cd scraper; \
	scrapy crawl games

dump:
	cd scraper/cleaner; \
	python runner.py