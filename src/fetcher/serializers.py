from rest_framework import serializers

from .models import Query, RelatedQuery, WebsiteTags, Website
from .tasks import parse_query


class QuerySerializer(serializers.ModelSerializer):
    websites_parsed = serializers.SerializerMethodField()

    class Meta:
        fields = ('id', 'text', 'type', 'websites', 'related', 'websites_parsed')
        model = Query

    def get_websites_parsed(self, obj):
        total = len(obj.websites.all())
        if total == 0:
            return 0
        else:
            return len(obj.websites.filter(processed=True)) / total


class QueryDetailSerializer(QuerySerializer):
    class Meta:
        fields = ('id', 'text', 'type', 'websites', 'related', 'websites_parsed')
        model = Query
        depth = 1


class QueryCreateSerializer(serializers.Serializer):
    text = serializers.CharField()
    type = serializers.ChoiceField(Query.query_types)
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    def create(self, validated_data):
        query = Query.objects.create(**validated_data)
        parse_query.delay(query.pk, query.type)
        return query


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
