import threading
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
import urllib.parse as urllibparse
import time
from bs4 import BeautifulSoup
from subprocess import check_output

from django.contrib.auth import get_user_model

from fetcher.models import Website, WebsiteTags, Query, RelatedQuery
import json

class WebsiteTagScrapper:
    class __WebsiteTagScrapper:
        def __init__(self):
            self.executor = ThreadPoolExecutor(max_workers=5)

        def remove_spaces(self, text):
            import re
            pat = re.compile(r'\s+')
            return pat.sub(' ', text)

        def parseweb(self, website):
            flag = False
            url = website.url
            tags = check_output(
                ["phantomjs", "./fetcher/scrapper/tags.js", url, '--ssl-protocol=any', '--load-images=false',
                 '--ignore-ssl-errors=true'])
            decoded = tags.decode('utf-8')
            tagsJson = json.loads(decoded)

            def parse_it(tag, type):
                if len(tagsJson[tag]) > 0:
                    strs = tagsJson[tag]
                    while len(strs) > 0:
                        str = strs.pop(0)
                        count = 1
                        for s in strs:
                            if s == str:
                                count += 1
                        website.tags.add(WebsiteTags.objects.create(text=str, count=count, type=type))
                pass

            parse_it('titles', 't')
            parse_it('h1', 'h1')
            parse_it('h2', 'h2')
            parse_it('h3', 'h3')
            parse_it('h4', 'h4')
            parse_it('lists', 'l')
            parse_it('imtitles', 'im')
            parse_it('imalts', 'al')
            parse_it('bold', 'b')
            parse_it('italic', 'it')
            parse_it('underlined', 'u')

            flag = True

            website.processed = True
            website.save()
            return flag

        def start(self, queryModel):
            websites = queryModel.websites.filter(processed=False)
            if len(websites) > 0:
                future_to_website = {self.executor.submit(self.parseweb, website): website for website in websites}
                for future in as_completed(future_to_website):
                    website = future_to_website[future]
                    try:
                        data = future.result()
                    except Exception as exc:
                        print('%r generated an exception: %s' % (website.url, exc))
                        pass
            pass

    instance = None

    def __new__(cls):  # __new__ always a classmethod
        if not WebsiteTagScrapper.instance:
            WebsiteTagScrapper.instance = WebsiteTagScrapper.__WebsiteTagScrapper()
        return WebsiteTagScrapper.instance


class YoutubeScrapper:
    baseUrl = 'https://youtube.com'
    numberOfLinksToGet = 15
    sleepTime = 2


    def parsepage(self, page, queryModel):
        if page is None:
            return False
        resultsContainer = page.find('div', {'id': 'results'})
        oldCount = queryModel.websites.count()
        if resultsContainer is not None:
            results = resultsContainer.find_all('a', {'class': 'yt-uix-sessionlink'})
            if len(results) > 0:
                index = 0
                while index < len(results) and queryModel.websites.count() < self.numberOfLinksToGet:
                    result = results[index]
                    link = result['href']
                    if link is not None and link.find('watch') != -1:
                        link = 'https://www.youtube.com' + link
                        existent = Website.objects.filter(url=link)
                        if len(existent) > 0:
                            websiteModel = existent[0]
                        else:
                            websiteModel = Website.objects.create(url=link)
                        queryModel.websites.add(websiteModel)
                    index += 1
        return oldCount != queryModel.websites.count()

    def getNextPage(self,doc):
        try:
            resultsContainer = doc.find('div', {'class': 'search-pager'})
            if resultsContainer is not None:
                next = resultsContainer.find('button').findNext('a')
                if next is not None:
                    url = '{0}{1}'.format(self.baseUrl, next['href'])
                    return BeautifulSoup(requests.get(url).text)
        except Exception:
            return None
        return None

    def getresults(self, query, user_id):
        queryModel = Query.objects.create(text=query, type=Query.QUERY_TYPE_YOUTUBE,
                                          user=get_user_model().objects.get(pk=user_id))

        query = urllibparse.quote_plus(query)

        #First page
        url = '{0}/results?&search_query={1}'.format(self.baseUrl, query)
        r = requests.get(url)
        doc = BeautifulSoup(r.text)
        gotResults = self.parsepage(doc, queryModel)
        time.sleep(self.sleepTime)
        while gotResults and queryModel.websites.count() < self.numberOfLinksToGet:
            doc = self.getNextPage(doc)
            gotResults = self.parsepage(doc, queryModel)

        queryModel.save()

class GoogleScrapper:
    googleBaseUrl = 'https://www.google.com/search?ion=1&espv=2&ie=UTF-8&aqs=chrome..69i57j0l5.1736j0j8'
    numberOfLinksToGet = 15
    numberOfResultsPerPage = 100
    sleepTime = 2
    # web_scrapper = WebsiteTagScrapper()

    def __init__(self):
        pass

    def savetofile(self, filename, text):
        with open(filename, 'w') as out:
            out.write(text)

    def parsesearchobject(self, object):
        url = None
        try:
            url = object.find('h3', {'class': 'r'}).find('a')['href']
        except Exception:
            return None
        if url[:7] == '/url?q=':
            end = None
            try:
                end = url.index('&sa=')
            except Exception:
                return None
            finally:
                if end is None:
                    return None
            result = url[7:end]
            try:
                result = urllibparse.unquote_plus(result)
            except Exception:
                result = url[7:end]
            return result
        return None

    def cutTheUrl(self,url):
        split = url.split('/')
        if len(split) > 5:
            return '{0}{1}'.format('/'.join(split[0:5]),'/')
        return url

    def parsepage(self, page, queryModel):
        resultsContainer = page.find('div', {'id': 'ires'})
        oldCount = queryModel.websites.count()
        if resultsContainer is not None:
            results = resultsContainer.find_all('div', {'class': 'g'})
            if len(results) > 0:
                index = 0
                while index < len(results) and queryModel.websites.count() < self.numberOfLinksToGet:
                    result = results[index]
                    link = self.parsesearchobject(result)
                    if link is not None:
                        link = self.cutTheUrl(link)
                        existent = Website.objects.filter(url=link)
                        if len(existent) > 0:
                            websiteModel = existent[0]
                        else:
                            websiteModel = Website.objects.create(url=link)
                        queryModel.websites.add(websiteModel)
                    index += 1
        return oldCount != queryModel.websites.count()

    def getrelated(self, queryModel, url):
        related = check_output(["phantomjs", "./fetcher/scrapper/relatedsearch.js", url, '--ssl-protocol=any', '--load-images=false', '--ignore-ssl-errors=true'])
        results = []
        try:
            related = related.decode('utf-8').replace('\n', '')
            results = related.split(',')
        except Exception:
            pass
        related = results
        if len(related) > 0:
            for rel in related:
                existent = RelatedQuery.objects.filter(text=rel)
                if len(existent) > 0:
                    relatedModel = existent[0]
                else:
                    relatedModel = RelatedQuery.objects.create(text=rel)
                queryModel.related.add(relatedModel)
            queryModel.relatedProcessed = True
            queryModel.save()

    def getresults(self, query, user_id):
        queryModel = Query.objects.create(text=query, type=Query.QUERY_TYPE_GOOGLE,
                                          user=get_user_model().objects.get(pk=user_id))

        query = urllibparse.quote_plus(query)

        # Related
        # thread = threading.Thread(target=self.getrelated, args=(queryModel,'{0}&num={1}&q={2}&oq={2}'.format(self.googleBaseUrl, 10, query)))
        # thread.start()
        # thread.join()

        page = 0
        gotResults = True
        while queryModel.websites.count() < self.numberOfLinksToGet and gotResults:
            url = '{0}&num={1}&q={2}&oq={2}&start={3}'.format(self.googleBaseUrl, self.numberOfResultsPerPage, query,
                                                              page * 100)
            r = requests.get(url)
            doc = BeautifulSoup(r.text)
            gotResults = self.parsepage(doc, queryModel)
            time.sleep(self.sleepTime)
            page += 1

        queryModel.save()
        self.getrelated(queryModel,'{0}&num={1}&q={2}&oq={2}'.format(self.googleBaseUrl, 10, query))
        # self.web_scrapper.start(queryModel)
        # websites = queryModel.websites.filter(processed=False)
        # if len(websites) > 0:
        #     parse_websites(websites)
        pass