FROM python:3.6.4

ADD ./src /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]