PORT = 3000

install:clean
	./scripts/install.sh

run:install
	./scr3000ipts/run.sh $(PORT)

clean:
	./scripts/clean.sh

test:install
	./scripts/test.sh