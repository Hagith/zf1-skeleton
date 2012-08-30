SHELL := /bin/bash
LESS_PATH = public/less/
CSS_PATH = public/css/

LESS_COMPRESSOR ?= `which lessc`
WATCHR ?= `which watchr`

LESS_TARGETS=${LESS_PATH}targets/*.less

#
# BUILD ALL
#

all: css

#
# BUILD CSS
# lessc is required
#

css:
	@for file in $(LESS_TARGETS); do \
	    filename=`basename "$$file"`; \
	    name="$${filename%%.*}"; \
	    echo "Generating target \"$$name\""; \
	    lessc $$file > ${CSS_PATH}$$name.css; \
	    lessc --compress $$file > ${CSS_PATH}$$name.min.css; \
	done

#
# WATCH LESS FILES
#

js:
	cat public/js/libs/bootstrap/bootstrap-* > public/js/libs/bootstrap/bootstrap.js
	uglifyjs -nc public/js/libs/bootstrap/bootstrap.js > public/js/libs/bootstrap/bootstrap.min.js

watch:
	@echo "Watching less files..."
	watchr -e "watch('$(LESS_PATH).*\.less') { system 'make css' }"


.PHONY: css js watch
