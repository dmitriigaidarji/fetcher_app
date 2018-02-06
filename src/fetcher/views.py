from django.shortcuts import render

# Create your views here.
from django.views import View


class IndexView(View):
    def get(self, request):
        return render(request, 'fetcher/index.html', {
                'useragent' : request.META['HTTP_USER_AGENT']
                })