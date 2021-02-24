scrape:
	cd jeppy/scraper; \
	scrapy crawl games

initdb:
	cd jeppy; \
	python -m scripts.initdb

dumptodb:
	cd jeppy; \
	python -m scripts.dumptodb

practice:
	cd jeppy; \
	python -m scripts.practice

clean:
	rm -rf data/; \
	mkdir data

clean-and-run: clean scrape initdb dumptodb

run-client:
	cd frontend/client; \
	yarn start
