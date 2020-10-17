from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('process', views.url_process, name='process'),
    path('copy', views.copy_process, name='copy'),
]
