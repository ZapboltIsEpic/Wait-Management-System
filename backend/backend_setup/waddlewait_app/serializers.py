
from rest_framework import serializers
from .models import Table
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = [
            'table_number',
            'table_in_use',
            'seats_max',
            'seats_in_use',
            'order_id',
            'is_near_window',
            'is_quiet_area',
    ]

class TableBookingSerializer(serializers.ModelSerializer): # new serializer class
    class Meta:
        model = Table
        fields = ['table_in_use', 'seats_in_use', 'order_id' ] # define required fields
