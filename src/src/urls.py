"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.views import login, logout
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from fetcher.api import QuerySet
from rest_framework_swagger.views import get_swagger_view

from fetcher.forms import MyAuthenticationForm
from fetcher.views import IndexView, FetcherApp

schema_view = get_swagger_view(title='FecherApp API')

router = routers.DefaultRouter()
router.register(r'queries', QuerySet, base_name='Query')

urlpatterns = [
    path('fetcher/', include([
        path('admin/', admin.site.urls),
        url(r'^schema/', schema_view),
        url(r'^api/', include(router.urls)),
        path('login/', login, {'authentication_form': MyAuthenticationForm}, name='login'),
        url(r'^logout/$', logout, name='logout'),
        url(r'^', FetcherApp.as_view(), name='fetcher')
    ])),
    url(r'^', IndexView.as_view(), name='index')
]
