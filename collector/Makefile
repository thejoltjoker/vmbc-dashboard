DOCKER_USERNAME ?= thejoltjoker
APPLICATION_NAME ?= vmbc-dashboard-collector

build:
	docker build --tag ${DOCKER_USERNAME}/${APPLICATION_NAME} .
push:
	docker push ${DOCKER_USERNAME}/${APPLICATION_NAME}
	npm version patch
run: 
	docker run -d ${DOCKER_USERNAME}/${APPLICATION_NAME}
