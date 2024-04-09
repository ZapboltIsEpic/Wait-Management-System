from rest_framework import serializers
from waddlewait_app.models import Table
from .models import Order, OrderItem, BillRequest
from waddlewait_app.serializers import TableSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    item_name = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
<<<<<<< HEAD

        fields = [
            'order',
            'item',
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
    

=======
        fields = ['id', 
                  'order', 
                  'item',
                  'quantity', 
                  'is_preparing',
                  'is_ready',
                  'wait_staff_assigned',
                  'deliver'
                  ]
        
>>>>>>> main
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id',
                  'created_at',
                  'table',
                  'is_complete',
                  'bill']
        read_only_fields = ['created_at']

class BillRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = BillRequest
        fields = ['id',
<<<<<<< HEAD
                  'table',
=======
                  'table_id',
>>>>>>> main
                  'total_amount',
                  'staff_name',
                  'request_status',
                  ]
