FROM python:3

ADD ./src /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["gunicorn", "-c", "gunicorn-config.py", "src.wsgi:application"]