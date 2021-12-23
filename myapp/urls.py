from collections import UserList
from django.conf.urls import url
from django.urls import path
from .views import *

urlpatterns = [
    #  path("",index,name='index'),
    # path('users/',UserAccountList.as_view(),name='user')
    path('users', RegistrationAPIView.as_view()),
    path('users/login', LoginAPIView.as_view()),
    path('user', UserRetrieveUpdateAPIView.as_view()),

]
