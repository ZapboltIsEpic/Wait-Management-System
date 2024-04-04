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
                  'is_ready']
        
class OrderItemSimplifiedSerializer(serializers.ModelSerializer):
    item_name = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem

        fields = [
            'order',
            'item_name',
            'quantity',
            'status'
        ]
    
    def get_item_name(self, obj):
        return obj.item.name
    
    def get_status(self, obj):
        if obj.is_ready:
            return "Ready"
        elif obj.is_preparing:
            return "Preparing"
        else:
            return "Pending"
    

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
