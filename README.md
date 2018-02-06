# Dockerized React Django Celery applicaiton

This application is served as an example of how to create a development environment using Docker containers to connect Single Page ReactJS application with Django back-end. The stack includes:

  - ReactJS front-end single page application with persistent storage using Redux
  - Django back-end serving as REST API framework
  - Celery worker to perform background tasks
  - Node.js server for hot live-update development
  - MariaDB as a database
  - Redis as a cache and Django-Celery communicating layer
  - Nginx as web server
  - Docker to containerize everything for development and deployment