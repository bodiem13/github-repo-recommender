from django.db import models
from django.urls.converters import DEFAULT_CONVERTERS

# Create your models here.

#create an Article table in database
class Article(models.Model):
    #create two fields in model
    title = models.CharField(max_length=100)
    description = models.TextField()

    #in admin console, objects will now show title
    def __str__(self):
        return self.title
