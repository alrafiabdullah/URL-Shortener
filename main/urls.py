from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('process', views.longURL_process, name='process'),
    path('expand', views.shortURL_process, name='expand'),
    path('copy', views.copy_process, name='copy'),
]
