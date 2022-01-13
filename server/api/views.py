from django.db.models.query import QuerySet
from django.shortcuts import render, HttpResponse
from rest_framework.authtoken.models import Token
from .models import Article
from .serializers import ArticleSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

#articleviewset class is extending from modelviewset
class ArticleViewSet(viewsets.ModelViewSet):
    #add queryset
    queryset = Article.objects.all()
    #specify serializer class
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )
