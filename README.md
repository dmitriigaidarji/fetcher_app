# Dockerized React Django Celery applicaiton

This application is served as an example of how to create a development environment using Docker containers to connect Single Page ReactJS application with Django back-end. The stack includes:

  - ReactJS front-end single page application with persistent storage using Redux
  - Django back-end serving as REST API framework
  - Celery worker to perform background tasks using PhantomJS headless browser to crawl javascript-heavy websites for data
  - Node.js server for hot live-update development
  - MariaDB as a database
  - Redis as a cache and Django-Celery communicating layer
  - Gunicorn as an application server
  - Nginx as web server
  - Docker to containerize everything for development and deployment


### Application description

Query form to perform search requests againt YouTube and Google, display top 100 results, display 'Cloud of Words' for all results from Google

### Installation

Application requires [Docker](https://docker.com/) and [Docker Compose](https://docs.docker.com/compose/) to run.

Build and run the containers

```sh
$ docker-compose build
$ docker-compose run
```

Open the website in your browser

```sh
localhost:8000
```

### Todos

 - Rewrite all javascript requests using AXIOS library and move everything to reducers
 - Move all heavy calculations to Celery tasks
 - Publish project to a demo server
 - Add Google crawler functionality
 - Add RabbitMQ service as a more reliable communication layer between Django and Celery
 - Add sign up / login functionality instead of anonymous sessions

License
----

MIT