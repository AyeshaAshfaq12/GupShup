from django.db import models

# Create your models here.


class Chat(models.Model):
    sender = models.CharField(max_length=30)
    message = models.CharField(max_length=2000)
    date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.sender)
    
    