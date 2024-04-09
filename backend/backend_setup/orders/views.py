import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import OrderItem, Order, BillRequest
from waddlewaitMenu.models import MenuItem, Category
import json

# Import the serializer
from .serializer import OrderSerializer, OrderItemSerializer

class OrderDeliverRequestNotificationView(APIView):
    def put(self, request):
        orderCheck = request.data.get('order')
        itemCheck = request.data.get('item')
        isReadCheck = request.data.get('is_ready')

        orderDeliverRequest = OrderItem.objects.filter(order = orderCheck, item = itemCheck, is_ready=isReadCheck)
        
        if orderDeliverRequest.exists():
            # updated_data = []
            for request in orderDeliverRequest:
                request.is_ready=True
                request.item_made_time = datetime.datetime.now()
                request.save()
                
                # # Convert necessary fields to built-in types
                # order = request.order
                # item = request.item
                
                # # Create a dictionary with updated order data
                # updated_order_data = {
                #     'order': order,
                #     'item': item,
                # }
                # updated_data.append(updated_order_data)
                
            return Response("Order Deliver Notification Success", status=status.HTTP_200_OK)
        else:
            # Return error response if validation fails
            return Response("Order Deliver Notification Error", status=status.HTTP_400_BAD_REQUEST)
        
class OrderDeliverRequestNotificationCheckView(APIView):
    def get(self, request):
        try:
            object = OrderItem.objects.exclude(item_made_time__isnull=True).latest('item_made_time')
            most_recent_item_made_time = object.item_made_time
            table_data = object.order.table.table_number
            order_data = object.order.id
            
            return Response({'most_recent_item_made_time': most_recent_item_made_time, 'table': table_data, 'order': order_data})
        except OrderItem.DoesNotExist:
            return Response("No OrderItem found", status=status.HTTP_404_NOT_FOUND)

class OrderDeliverNotificationAcceptedView(APIView):
    def put(self, request):
        orderCheck = request.data.get('order')
        itemCheck = request.data.get('item')
        wait_staff_assigned = request.data.get('wait_staff_assigned')
        
        orderDeliverRequest = OrderItem.objects.filter(order=orderCheck, item = itemCheck, wait_staff_assigned='none')
        
        if orderDeliverRequest.exists():
            # updated_data = []
            for request in orderDeliverRequest:
                request.wait_staff_assigned = wait_staff_assigned
                request.wait_staff_assigned_time = datetime.datetime.now()
                request.save()
                
                # # Convert necessary fields to built-in types
                # order = request.order
                # wait_staff_assigned = request.wait_staff_assigned
                
                # updated_order_data = {
                #     'order': order,
                #     'wait_staff_assigned': wait_staff_assigned,
                # }
                # updated_data.append(updated_order_data)
                
            
            return Response("Assigned Staff Successfully", status=status.HTTP_200_OK)
        else:
            # If no notifications are found, return a response indicating that
            return Response("Assigned Staff Fail", status=status.HTTP_404_NOT_FOUND)
        
class OrderDeliverNotificationAcceptedNotificationCheckView(APIView):
    def get(self, request):
        try:
            # Attempt to retrieve the latest OrderItem
            object = OrderItem.objects.exclude(wait_staff_assigned_time__isnull=True).latest('wait_staff_assigned_time')
            most_recent_staff_assigned_time = object.wait_staff_assigned_time
            most_recent_staff_assigned = object.wait_staff_assigned
            table_data = object.order.table.table_number
            order_data = object.order.id
            
            return Response({
                'most_recent_wait_staff_assigned_time': most_recent_staff_assigned_time,
                'most_recent_staff_assigned': most_recent_staff_assigned, 
                'table': table_data, 
                'order': order_data
            })
        except OrderItem.DoesNotExist:
            # Handle the case where no OrderItem is found
            return Response("No OrderItem found", status=status.HTTP_404_NOT_FOUND)

class OrderDeliverNotificationCompleteView(APIView):
    def put(self, request):
        orderCheck = request.data.get('order')
        itemCheck = request.data.get('item')
        deliverCheck = request.data.get('deliver')
        
        orderDeliverRequest = OrderItem.objects.filter(order=orderCheck, item = itemCheck, deliver=deliverCheck)
        
        if orderDeliverRequest.exists():
            # updated_data = []
            for request in orderDeliverRequest:
                # Update status or perform other actions as needed
                request.deliver = True
                request.save()
                
                # Convert necessary fields to built-in types
                # order = request.order
                # deliver = request.deliver
                
                # updated_order_data = {
                #     'order': order,
                #     'deliver': deliver,
                # }
                # updated_data.append(updated_order_data)
            
            return Response("Order Item deliver successfully", status=status.HTTP_200_OK)
        else:
            # If no notifications are found, return a response indicating that
            return Response("Order Item deliver fail", status=status.HTTP_404_NOT_FOUND)

class OrdersDeliverGetAllNotificationsView(APIView):
    def get(self, request):
        try:
            # Retrieve all assistance requests with Deliver = False from the database
            order_items = OrderItem.objects.filter(deliver=False, is_ready=True, wait_staff_assigned='none')
            
            notification_data = []
            for order_item in order_items:
                table_data = order_item.order.table.table_number
                item_name = order_item.item.name
                
                order_id = order_item.order.id
                quantity_data = order_item.quantity
                is_preparing_data = order_item.is_preparing
                is_ready_data = order_item.is_ready
                item_made_time_data = order_item.item_made_time
                wait_staff_assigned_time_data = order_item.wait_staff_assigned_time
                wait_staff_assigned_data = order_item.wait_staff_assigned
                deliver_data = order_item.deliver
                
                notification_data.append({
                                'order_id': order_id,
                                'table_number': table_data,
                                'item_name': item_name,
                                'quantity': quantity_data,
                                'is_preparing': is_preparing_data,
                                'is_ready': is_ready_data,
                                'item_made_time': item_made_time_data,
                                'wait_staff_assigned_time': wait_staff_assigned_time_data,
                                'wait_staff_assigned': wait_staff_assigned_data,
                                'deliver': deliver_data
                            })
            
            # orderSerializer = OrderItemSerializer(order, many=True)
            # Return the serialized data as a response
            # return Response(orderSerializer.data, status=status.HTTP_200_OK)
            
            return Response(notification_data, status=status.HTTP_200_OK)
        except OrderItem.DoesNotExist:
            return Response("No OrderItem found", status=status.HTTP_404_NOT_FOUND)
    
class OrdersCheckoutBillView(APIView):
    def get(self, request, table):
        # Retrieve the order instance
        try:
            billRequest = BillRequest.objects.get(table_id=table, request_status=False)
        except Order.DoesNotExist:
            return Response({"error": "Bill request not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Get the bill from the order
        bill = billRequest.total_amount
        table_id = billRequest.table_id

        orderIds = Order.objects.filter(table_id=table_id)
        orders = []
        for orderId in orderIds:
            orderItems = OrderItem.objects.filter(order_id = orderId, is_ready=True)
            for orderItem in orderItems:
                orders.append({"quantity": orderItem.quantity, "item_id": orderItem.item_id})
        
        for order in orders:
            item_id = order['item_id']
            item_data = MenuItem.objects.get(id = item_id)
            category_data = Category.objects.get(id = item_data.category_id)
            order['name'] = item_data.name
            order['description'] = item_data.description
            order['price'] = item_data.price
            order['category_name'] = category_data.name

        # Return the bill as a response
        return Response({"orders": orders, "bill": bill}, status=status.HTTP_200_OK)
        
    
    