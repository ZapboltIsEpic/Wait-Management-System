from rest_framework import serializers
from .models import Order, OrderItem
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
                  'deliver']
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)  # Serialize order items

    table = TableSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 
                  'created_at',
                  'table', 
                  'items', 
                  'is_complete',
                  'bill']

    def create(self, validated_data):
        items_data = validated_data.pop('items')  # Extract items data from validated data
        order = Order.objects.create(**validated_data)  # Create order instance
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)  # Create order items
        return order