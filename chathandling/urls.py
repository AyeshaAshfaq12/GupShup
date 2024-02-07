from django.urls import path
from . import views


urlpatterns = [
    path('', views.welcome, name="welcome"),
    path('chatroom/', views.chatroom, name="chatroom"),
    path('chat/<str:sender>/<str:message>/', views.chat, name="chat"),
    path('chatdata/', views.chatdata, name="chatdata"),
]


