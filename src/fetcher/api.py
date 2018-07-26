from rest_framework import viewsets
from .serializers import QuerySerializer, QueryDetailSerializer, QueryCreateSerializer


class QuerySet(viewsets.ModelViewSet):
    def get_queryset(self):
        return self.request.user.query_set.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return QueryDetailSerializer
        elif self.action == 'create':
            return QueryCreateSerializer
        return QuerySerializer
