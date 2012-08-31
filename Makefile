SHELL := /bin/bash
LESS_PATH = public/static/less/
CSS_PATH = public/static/css/

LESS_COMPRESSOR ?= `which lessc`
WATCHR ?= `which watchr`
UGLIFYJS ?= `which uglifyjs`
COMPOSER ?= `which composer`

LESS_TARGETS=${LESS_PATH}*.less

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
	    $(LESS_COMPRESSOR) $$file > ${CSS_PATH}$$name.css; \
	    $(LESS_COMPRESSOR) --compress $$file > ${CSS_PATH}$$name.min.css; \
	done

#
# BUILD JS
# uglifyjs required
#
js:
	cat public/static/js/bootstrap/bootstrap-* > public/static/js/bootstrap/bootstrap.js
	$(UGLIFYJS) -nc public/static/js/bootstrap/bootstrap.js > public/static/js/bootstrap/bootstrap.min.js

#
# WATCH LESS FILES
#
watch:
	@echo "Watching less files..."
	$(WATCHR) -e "watch('$(LESS_PATH).*\.less') { system 'make css' }"

#
# INSTALL
#
install:
	@$(COMPOSER) install
	@chmod -R 0777 var/
	@chmod -R 0777 public/shared/var/

.PHONY: css js watch install
