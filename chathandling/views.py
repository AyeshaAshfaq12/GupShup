from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from .models import Chat
import json

# Create your views here.


def welcome(request):
    return render(request, 'welcome.html')
        


def chatroom(request):  
    return render(request, 'index.html')  



def chat(request, sender, message):
    chat = Chat.objects.create(sender = sender, message = message)
    return JsonResponse({'message': 'Data received successfully.'})    



def chatdata(request):
    chats = Chat.objects.all()
    serialized_chats = serialize('json', chats)
    return JsonResponse({'chats': serialized_chats})

