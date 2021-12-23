from django.conf.urls import url
from django.urls import path
from .views import *

urlpatterns = [
    path('<sender>/<receiver>',MessageAPIView.as_view()),
    path('userlist',UserListApiView.as_view()),
]