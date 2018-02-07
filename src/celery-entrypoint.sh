#!/bin/sh

sleep 10

celery -A src.celery worker -l warning 