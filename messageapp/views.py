from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from messageapp.renderers import MessageJSONRenderer
from . serializer import *
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class MessageAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (MessageJSONRenderer,)
    serializer_class = MessageSerializer

    def get(self, request, *args, **kwargs):
        messages = Message.objects.filter(
            senduser=kwargs['sender'],replieduser=kwargs['receiver']) |Message.objects.filter(
                replieduser=kwargs['sender'],senduser=kwargs['receiver'])
        serializer = self.serializer_class(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer_data = request.data.get('message', {})
        
        serializer = self.serializer_class(data=serializer_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserListApiView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserListSerializer
    renderer_classes = (MessageJSONRenderer,)

    def get(self, request, *args, **kwargs):
        users=User.objects.exclude(username=request.user.username)
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)