DOCKER_USERNAME ?= thejoltjoker
APPLICATION_NAME ?= vmbc-dashboard-collector

build:
	docker build --tag ${DOCKER_USERNAME}/${APPLICATION_NAME} .
push:
	npm version patch
	docker push ${DOCKER_USERNAME}/${APPLICATION_NAME}
run: 
	docker run -d ${DOCKER_USERNAME}/${APPLICATION_NAME}
