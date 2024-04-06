from rest_framework import serializers
from waddlewait_app.models import Table
from .models import Order, OrderItem, BillRequest
from waddlewait_app.serializers import TableSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 
                  'order', 
                  'item', 
                  'quantity', 
                  'is_preparing',
                  'is_ready',
                  'wait_staff_assigned',
                  'deliver'
                  ]
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id',
                  'created_at',
                  'table',
                  'ready_to_serve',
                  'is_complete',
                  'wait_staff_assigned',
                  'deliver',
                  'bill']
        read_only_fields = ['created_at']

class BillRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = BillRequest
        fields = ['id',
                  'table_number',
                  'total_amount',
                  'staff_name',
                  'request_status'
                  ]
