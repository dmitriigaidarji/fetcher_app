from django.contrib.auth.views import LoginView
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.views import View




class IndexView(View):
    def get(self, request):
        a=1
        if request.user.is_authenticated:
            return render(request, 'fetcher/index.html', {
                    'useragent' : request.META['HTTP_USER_AGENT']
                    })
        else:
            return redirect('login')