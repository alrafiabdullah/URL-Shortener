import pyshorteners
import time

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

        shortener = pyshorteners.Shortener()
        processed_url = shortener.tinyurl.short(mainURL)

    return JsonResponse({
        'message': processed_url
    }, content_type="application/json", status=200)