fresh-scrape:
	rm -rf data/; \
	mkdir data; \
	cd jeppy/scraper; \
	scrapy crawl games; \
	cd ../../; \
	rm -rf backend/data; \
	mkdir backend/data; \
	cp data/dump.json backend/data/dump.json

clean:
	rm -rf jeppy/__pycache__/; \
	rm -rf jeppy/scrper/scraper/__pycache__/; \
	rm -rf backend/__pycache__/

run-backend:
	cd backend; \
	source ./venv/bin/activate; \
	pip install -r requirements.txt; \
	python app.py

run-frontend:
	cd frontend/client; \
	yarn; \
	yarn start

