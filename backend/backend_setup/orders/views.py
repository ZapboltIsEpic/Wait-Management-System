import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import OrderItem, Order, BillRequest
from waddlewaitMenu.models import MenuItem, Category
from waddlewaitMenu.serializers import MenuItemSerializer
import json

# Import the serializer
from .serializer import OrderSerializer, OrderItemSerializer, BillRequestSerializer

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
            
            return Response(notification_data, status=status.HTTP_200_OK)
        except OrderItem.DoesNotExist:
            return Response("No OrderItem found", status=status.HTTP_404_NOT_FOUND)
    
# class OrdersCheckoutBillView(APIView):
#     def get(self, request, table):
#         # Retrieve the order instance
#         try:
#             # billRequest = BillRequest.objects.get(table=table, request_status=False)
#             billRequest = BillRequest.objects.get(request_status=False)
#         except Order.DoesNotExist:
#             return Response({"error": "Bill request not found"}, status=status.HTTP_404_NOT_FOUND)
        
#         # Get the bill from the order
#         bill = billRequest.total_amount

#         # Return the bill as a response
#         return Response({"bill": bill}, status=status.HTTP_200_OK)
        
class OrdersCheckoutBillView(APIView):
    def get(self, request):
        # Retrieve all bill requests that have not been processed
        bill_requests = BillRequest.objects.filter(request_status=False)
        
        # Serialize the bill requests
        serializer = BillRequestSerializer(bill_requests, many=True)
        
        # Return the serialized bill requests as a response
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class OrdersDeleteBillView(APIView):
    def delete(self, request, table):
        try:
            bill_request = BillRequest.objects.get(table=table, request_status=False)
        except BillRequest.DoesNotExist:
            return Response({"error": "Bill request not found for the given table number"}, status=status.HTTP_404_NOT_FOUND)
        
        # Delete the bill request
        bill_request.delete()

        return Response({"message": "Bill request deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    