#!/bin/sh
sleep 10

python manage.py makemigrations

python manage.py migrate

gunicorn -c gunicorn-config.py src.wsgi:application