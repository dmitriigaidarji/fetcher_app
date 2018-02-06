from rest_framework import serializers
from rest_framework.relations import ManyRelatedField

from .models import Query, RelatedQuery, WebsiteTags, Website


class QuerySerializer(serializers.ModelSerializer):
    websites_parsed = serializers.SerializerMethodField()

    class Meta:
        fields = '__all__'
        model = Query

    def get_websites_parsed(self, obj):
        total = len(obj.websites.all())
        if total == 0:
            return 0
        else:
            return len(obj.websites.filter(processed=True)) / total


class QuerySimpleSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Query
        depth = 1


class RelatedSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = RelatedQuery


class WebsiteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Website
        depth = 1


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = WebsiteTags
