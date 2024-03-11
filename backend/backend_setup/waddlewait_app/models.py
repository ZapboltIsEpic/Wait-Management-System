from django.db import models

# Create your models here.

class Table(models.Model):
    table_number = models.IntegerField(primary_key = True, blank=True)
    table_in_use = models.BooleanField(blank=True)
    seats_max = models.IntegerField(blank=True)
    seats_in_use = models.IntegerField(blank=True)
    order_id = models.IntegerField(blank=True)
    is_near_window = models.BooleanField(blank=True)
    is_quiet_area = models.BooleanField(blank=True)
    def __str__(self):
        return "table " + str(self.table_number)
