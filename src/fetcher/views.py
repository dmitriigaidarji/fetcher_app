from django.shortcuts import render, redirect
from django.views import View


class IndexView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return render(request, 'fetcher/index.html', {
                'useragent': request.META['HTTP_USER_AGENT']
            })
        else:
            return redirect('login')
