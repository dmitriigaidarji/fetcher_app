"""gunicorn WSGI server configuration."""
from multiprocessing import cpu_count

def max_workers():
    return cpu_count()

# bind = 'unix:src.sock'
bind = '0.0.0.0:8000'
max_requests = 1000
reload = True
workers = max_workers()
errorlog = 'logs/gun-error.log'
accesslog = 'logs/gun-access.log'