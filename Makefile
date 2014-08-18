TESTS = $(shell find test/test.*.js)

test:
	@./test/run.sh $(TESTS)

.PHONY: test
