PORT = 3001

install:clean
	./scripts/install.sh

run:install
	./scripts/run.sh $(PORT)

clean:
	./scripts/clean.sh