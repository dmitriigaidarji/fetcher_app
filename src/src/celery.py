from __future__ import print_function
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from kombu import Exchange, Queue
from celery.schedules import crontab

from src import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')

app = Celery(str('src'), broker=settings.CELERY_BROKER_URL)

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.task_serializer = 'json'

default_exchange = Exchange(str('default'), type=str('direct'))

app.conf.task_queues = (
    Queue(str('default'), default_exchange, routing_key=str('default')),
)
app.conf.task_default_queue = 'default'
app.conf.task_default_exchange = 'default'
app.conf.task_default_routing_key = 'default'

app.autodiscover_tasks()