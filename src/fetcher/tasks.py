from celery.utils.log import get_task_logger
from celery.task import periodic_task, task

from fetcher.models import Query
from fetcher.scrapper.googlescrapper import YoutubeScrapper, GoogleScrapper

logger = get_task_logger(__name__)

"""
# Background task to parse Youtube and Google
#
"""


@task(bind=True, default_retry_delay=10, max_retries=5, queue='default')
def parse_query(self, query_id, q_type):
    if q_type == Query.QUERY_TYPE_GOOGLE:
        parser = GoogleScrapper()
        parser.getresults(query_id)
    elif q_type == Query.QUERY_TYPE_YOUTUBE:
        parser = YoutubeScrapper()
        parser.getresults(query_id)
    else:
        raise Exception('Wrong query type')
