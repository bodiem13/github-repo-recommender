from django.contrib import admin
from .models import Article
# Register your models here.

#checking django admin panel shows Articles 
#admin.site.register(Article)

# adds filters to admin panel
@admin.register(Article)
class ArticleModel(admin.ModelAdmin):
    list_filter = ('title', 'description')
    list_display = ('title', 'description')

