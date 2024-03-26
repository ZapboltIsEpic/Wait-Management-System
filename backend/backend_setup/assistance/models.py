from django.db import models

class Assistance(models.Model):
    tableNumber = models.IntegerField() 
    staffName = models.CharField(max_length=255)
    tableStatus = models.BooleanField(default=False)
    
    def __str__(self):
        return self.tableStatus