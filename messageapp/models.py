from django.db import models

from myapp.models import User

# Create your models here.
class Message(models.Model):
    message=models.CharField(max_length=255)
    senduser=models.ForeignKey(User,on_delete=models.DO_NOTHING,to_field='username',related_name='senduser')
    replieduser=models.ForeignKey(User,on_delete=models.DO_NOTHING,to_field='username',related_name='replieduser')
    timestamp = models.DateTimeField(auto_now_add=True)
    class Meta:
           ordering = ('timestamp',)
