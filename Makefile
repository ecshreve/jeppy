scrape:
	cd scraper; \
	scrapy crawl games

run:
	cd scraper/cleaner; \
	python runner.py

practice:
	cd scraper/cleaner; \
	python practice.py