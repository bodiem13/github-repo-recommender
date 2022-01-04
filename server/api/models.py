from django.db import models
from django.urls.converters import DEFAULT_CONVERTERS

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
