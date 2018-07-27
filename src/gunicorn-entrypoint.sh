#!/bin/sh
sleep 10

python manage.py makemigrations

python manage.py migrate

python manage.py collectstatic --no-input

python manage.py populate_users

gunicorn -c gunicorn-config.py src.wsgi:application