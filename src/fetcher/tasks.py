from celery.utils.log import get_task_logger
from celery.task import periodic_task, task

from fetcher.scrapper.googlescrapper import YoutubeScrapper, GoogleScrapper

logger = get_task_logger(__name__)


"""
# Background task to parse Youtube and Google
#
"""

@task
def add(x, y):
    return x + y

@task(bind=True, default_retry_delay=10, max_retries=5,
      options={'queue': 'default'}, queue='default')
def parse_youtube(self, query, identifier):
    parser = YoutubeScrapper()
    parser.getresults(query, identifier)

@task(bind=True, default_retry_delay=10, max_retries=5,
      options={'queue': 'default'}, queue='default')
def parse_google(self, query, identifier):
    parser = GoogleScrapper()
    parser.getresults(query, identifier)