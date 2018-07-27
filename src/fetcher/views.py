from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View


class IndexView(View):
    def get(self, request):
        return redirect('fetcher')


class FetcherApp(View):
    def get(self, request):
        if request.user.is_authenticated:
            return render(request, 'fetcher/index.html', {
                'logout_url': reverse('logout')
            })
        else:
            return redirect('login')