import random
import string

from rest_framework import status, routers, serializers, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from fetcher.scrapper.googlescrapper import GoogleScrapper, YoutubeScrapper
from .models import Query, RelatedQuery, Website, WebsiteTags
from .serializers import QuerySerializer, RelatedSerializer, WebsiteSerializer, TagSerializer, QuerySimpleSerializer

import datetime
from fetcher.tasks import parse_youtube, parse_google

def initsession(request):
    request.session.set_expiry(5000000) # 2 months
    if 'identifier' not in request.session:
        request.session['identifier'] = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(15))

@api_view(['POST'])
def query(request):
    initsession(request)
    query = request.data.get('query','')
    if query != '':
        type = request.data.get('type','g')
        ident = request.session.get('identifier')
        if type == 'y':
            parse_youtube.delay(query, ident)
            # parser = YoutubeScrapper()
            # parser.getresults(query, ident)
        else:
            parse_google.delay(query, ident)
            # parser = GoogleScrapper()
            # parser.getresults(query, ident)
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['GET'])
def get_query(request):
    type = request.data.get('type','g')
    query = Query.objects.get(id = request.GET.get('id',None), type = type)
    queriesSerializer = QuerySerializer(query)
    related = query.related.all()
    relatedSerializer = RelatedSerializer(related, many=True)
    websites = query.websites.all()[0:20]
    websiteSerializer = WebsiteSerializer(websites, many=True)

    response = {
        'query' : queriesSerializer.data,
        'related' : relatedSerializer.data,
        'websites' : websiteSerializer.data,
        'totalwebsites' : len(query.websites.all())
    }
    return Response(response, status=status.HTTP_200_OK)

@api_view(['POST'])
def delete_query(request):
    query = Query.objects.get(id = request.data.get('id', None))
    if query is not None:
        query.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def querywebsites(request):
    query = Query.objects.get(id=int(request.GET.get('query', -1)))
    offset = int(request.GET.get('offset',0))
    count = int(request.GET.get('count',20))
    websites = query.websites.all()[offset:offset+count]
    return Response(WebsiteSerializer(websites, many=True).data, status=status.HTTP_200_OK)


@api_view(['GET'])
def websitestags(request):
    query = Query.objects.get(id=int(request.GET.get('query', -1)))
    count = int(request.GET.get('count',20))
    websites = query.websites.all()[0:count]

    alltags=[]
    multiplier = 1
    for website in websites:
        tags = website.tags.all()
        for tag in tags:
            index = 0
            flag = False
            while not flag and index < len(alltags):
                if alltags[index]['value'] == tag.text:
                    alltags[index]['count'] += tag.count * multiplier
                    flag = True
                index += 1
            if not flag:
                alltags.append({
                    'value' : tag.text,
                    'count' : tag.count * multiplier
                })
            pass
    pass

    return Response(alltags, status=status.HTTP_200_OK)


@api_view(['GET'])
def websitetags(request):
    website = Website.objects.get(id=int(request.GET.get('website', -1)))
    tags = website.tags.all()
    return Response(TagSerializer(tags, many=True).data, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_queries(request):
    initsession(request)
    ident = request.session['identifier']
    queries = Query.objects.filter(identifier=ident)
    return Response(QuerySimpleSerializer(queries, many=True).data)


class QuerySet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer