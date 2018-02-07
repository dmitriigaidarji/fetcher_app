# from fabric.api import local
from fabric.api import *
from fabric.context_managers import cd
import json
from pprint import pprint

env.activate = 'source env/bin/activate'


@task
def build():
    with prefix(env.activate):
        webpack_local()

@task
def build_prod():
    with prefix(env.activate):
        webpack_local()

@task
def static():
    local('./manage.py collectstatic --no-input')

@task
def webpack_local():
    local('rm -rf compiled/bundles/local/*')
    local('rm -rf static/bundles/local/*')
    local('node_modules/.bin/webpack --config webpack.local.config.js --progress --colors')
    static()

@task
def webpack_stage():
    local('rm -rf compiled/bundles/stage/*')
    local('rm -rf static/bundles/stage/*')
    local('node_modules/.bin/webpack --config webpack.stage.config.js --progress --colors')
    static()
    
@task
def webpack_prod():
    local('rm -rf compiled/bundles/prod/*')
    local('rm -rf static/bundles/prod/*')
    local('node_modules/.bin/webpack --config webpack.prod.config.js --progress --colors')
    static()
