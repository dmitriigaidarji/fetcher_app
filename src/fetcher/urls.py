from django.conf.urls import url
from fetcher.api import query, get_query, delete_query, querywebsites, websitestags, websitetags, user_queries

from . import views

urlpatterns = [
    url(r'^api/query/', query),
    url(r'^api/userqueries/', user_queries),
    url(r'^api/getquery/',get_query),
    url(r'^api/deletequery/',delete_query),
    url(r'^api/querywebsites/', querywebsites),
    url(r'^api/websitestags/', websitestags),
    url(r'^api/websitetags/', websitetags),
    url(r'', views.IndexView.as_view(), name='index'),
]