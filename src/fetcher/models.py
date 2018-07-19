from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class WebsiteTags(models.Model):
    TAG_TYPES = (
        ('t', 'title'),
        ('h1', 'h1'),
        ('h2', 'h2'),
        ('h3', 'h3'),
        ('h4', 'h4'),
        ('l', 'li'),
        ('im', 'Image Title'),
        ('al', 'Image Alternate Text'),
        ('b', 'Bold'),
        ('it', 'Italic'),
        ('u', 'Underlined')
    )

    text = models.TextField()
    type = models.CharField(
        max_length=2,
        choices=TAG_TYPES,
        default='h1',
    )
    count = models.IntegerField(default=1)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ('-count',)


class Website(models.Model):
    url = models.CharField(max_length=1000)
    tags = models.ManyToManyField(WebsiteTags)
    processed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url

    class Meta:
        ordering = ('id',)


class RelatedQuery(models.Model):
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ('text',)


class Query(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    websites = models.ManyToManyField(Website)
    related = models.ManyToManyField(RelatedQuery)
    relatedProcessed = models.BooleanField(default=False)

    QUERY_TYPE_GOOGLE = 'g'
    QUERY_TYPE_YOUTUBE = 'y'
    query_types = (
        (QUERY_TYPE_GOOGLE, 'google'),
        (QUERY_TYPE_YOUTUBE, 'youtube'),
    )
    type = models.CharField(
        max_length=1,
        choices=query_types,
        default=QUERY_TYPE_GOOGLE,
    )
    
    def __str__(self):
        return self.text

    class Meta:
        ordering = ('-id',)




#TODO superuser automation
#https://stackoverflow.com/questions/6244382/how-to-automate-createsuperuser-on-django
