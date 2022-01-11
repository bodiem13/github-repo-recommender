
from django.urls import path
from .views import ArticleList, ArticleDetails
#article_list, article_details

urlpatterns= [
    path('articles/', ArticleList.as_view()),
    path('articles/<int:id>/', ArticleDetails.as_view())
    ]

# urlpatterns = [
#     path('articles/', article_list),
#     path('articles/<int:pk>/', article_details)

# ]