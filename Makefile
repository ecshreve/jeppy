fresh-scrape:
	rm data/dump.json; \
	cd scraper; \
	scrapy crawl games; \
	cd ../; \
	rm backend/data/dump.json; \
	cp data/dump.json backend/data/dump.json

clean:
	rm -rf scraper/scraper/__pycache__/; \
	rm -rf backend/__pycache__/

pop-db:
	cd backend; \
	source venv/bin/activate; \
	pip install -r requirements.txt; \
	python populate_db.py

run-backend:
	cd backend; \
	source ./venv/bin/activate; \
	pip install -r requirements.txt; \
	python app.py

run-frontend:
	cd frontend/client; \
	yarn; \
	yarn start

