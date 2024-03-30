from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import OrderItem, Order
import json

# Import the serializer
from .serializer import OrderSerializer

class OrderDeliverRequestNotificationView(APIView):
    def put(self, request):
        tableCheck = request.data.get('table')
        readyToServeCheck = False
        orderDeliverRequest = Order.objects.filter(table = tableCheck, is_complete = readyToServeCheck, deliver=False)
        
        if orderDeliverRequest.exists():
            updated_data = []
            for request in orderDeliverRequest:
                request.ready_to_serve = True
                request.save()
                
                # Convert necessary fields to built-in types
                table_number = request.table.table_number
                ready_to_serve = request.ready_to_serve
                
                # Create a dictionary with updated order data
                updated_order_data = {
                    'table': table_number,
                    'ready_to_serve': ready_to_serve,
                }
                updated_data.append(updated_order_data)
                
            return Response(updated_data, status=status.HTTP_200_OK)
        else:
            # Return error response if validation fails
            return Response("Notification Error", status=status.HTTP_400_BAD_REQUEST)

class OrderDeliverNotificationAcceptedView(APIView):
    def put(self, request):
        tableCheck = request.data.get('table')
        wait_staff_assigned = request.data.get('wait_staff_assigned')
        orderDeliverRequest = Order.objects.filter(table=tableCheck, wait_staff_assigned='none', deliver=False)
        
        if orderDeliverRequest.exists():
            updated_data = []
            for request in orderDeliverRequest:
                request.wait_staff_assigned = wait_staff_assigned
                request.save()
                
                # Convert necessary fields to built-in types
                table_number = request.table.table_number
                wait_staff_assigned = request.wait_staff_assigned
                
                updated_order_data = {
                    'table': table_number,
                    'wait_staff_assigned': wait_staff_assigned,
                }
                updated_data.append(updated_order_data)
                
            
            return Response(updated_data, status=status.HTTP_200_OK)
        else:
            # If no notifications are found, return a response indicating that
            return Response("No notifications found for the provided table number and status", status=status.HTTP_404_NOT_FOUND)

class OrderDeliverNotificationCompleteView(APIView):
    def put(self, request):
        tableCheck = request.data.get('table')
        orderDeliverRequest = Order.objects.filter(table=tableCheck, deliver=False)
        
        if orderDeliverRequest.exists():
            updated_data = []
            for request in orderDeliverRequest:
                # Update status or perform other actions as needed
                request.deliver = True
                request.save()
                
                # Convert necessary fields to built-in types
                table_number = request.table.table_number
                deliver = request.deliver
                
                updated_order_data = {
                    'table': table_number,
                    'deliver': deliver,
                }
                updated_data.append(updated_order_data)
            
            return Response(updated_data, status=status.HTTP_200_OK)
        else:
            # If no notifications are found, return a response indicating that
            return Response("No notifications found for the provided table number and status", status=status.HTTP_404_NOT_FOUND)

class OrdersDeliverGetAllNotificationsView(APIView):
    def get(self, request):
        # Retrieve all assistance requests with Deliver = False from the database
        order = Order.objects.filter(deliver=False, ready_to_serve=True)
        
        orderSerializer = OrderSerializer(order, many=True)
        
        # Return the serialized data as a response
        return Response(orderSerializer.data, status=status.HTTP_200_OK)
    
class OrdersCheckoutBillView(APIView):
    def get(self, request, tableNumber):
        # Retrieve the order instance
        try:
            order = Order.objects.get(table=tableNumber, is_complete=False)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Get the bill from the order
        bill = order.bill

        # Return the bill as a response
        return Response({"bill": bill}, status=status.HTTP_200_OK)
        
    
    