#!/bin/sh

gunicorn -c gunicorn-config.py src.wsgi:application