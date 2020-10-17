import pyshorteners
import time
import requests
import json

from django.shortcuts import render
from django.http import JsonResponse
from django.middleware.csrf import get_token

# Create your views here.


def index(request):
    csrf_token = get_token(request)
    return render(request, "main/index.html")

def url_process(request):
    time.sleep(3)
    if request.method == "POST":
        mainURL = request.POST["mainURL"]
        choice = request.POST["choice"]

        shortener = pyshorteners.Shortener()
        if str(choice) == "TinyURL.com":
            processed_url = shortener.tinyurl.short(mainURL)
        elif str(choice) == "NullPointer":
            processed_url = shortener.nullpointer.short(mainURL)
        elif str(choice) == "Os.db":
            processed_url = shortener.osdb.short(mainURL)
        else:
            try:
                processed_url = shortener.gitio.short(mainURL)
            except:
                processed_url = "failed"

# 
    return JsonResponse({
        'message': processed_url
    }, content_type="application/json", status=200)