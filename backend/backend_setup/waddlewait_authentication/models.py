from django.db import models
from django.contrib.auth.models import AbstractUser
    
class Assistance(models.Model):
    customerName = models.CharField(max_length=255)
    staffName = models.CharField(max_length=255)
    tableNumber = models.IntegerField()

    def __str__(self):
        return self.name

class Order(models.Model):
    customerName = models.CharField(max_length=255)
    staffName = models.CharField(max_length=255)

    def __str__(self):
        return self.name