from rest_framework import serializers
from . models import *
from myapp.models import User

class MessageSerializer(serializers.ModelSerializer):
     class Meta:
        model = Message
        fields = ['message','senduser','replieduser','timestamp']

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ('email', 'username',)
