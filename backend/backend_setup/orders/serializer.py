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

    def create(self, validated_data):
        items_data = validated_data.pop('items')  # Extract items data from validated data
        order = Order.objects.create(**validated_data)  # Create order instance

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)  # Create order items
        return order

class BillRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = BillRequest
        fields = ['id',
                  'table_number',
                  'total_amount',
                  'staff_name',
                  'request_status'
                  ]
