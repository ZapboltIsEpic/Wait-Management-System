from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import OrderItem, Order

# Import the serializer
from .serializer import OrderItemSerializer

class OrderDeliverRequestNotificationView(APIView):
    def post(self, request):
        serializer = OrderItemSerializer(data=request.data)
        
        # Validate the serializer
        if serializer.is_valid():
            # Save the validated data
            serializer.save()
            # Return success response
            return Response("Notification request received", status=status.HTTP_200_OK)
        else:
            # Return error response if validation fails
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDeliverNotificationAcceptedView(APIView):
    def put(self, request):
        orderCheck  = request.data.get('order')
        wait_staff_assigned = request.data.get('wait_staff_assigned')
        
        orderDeliverRequest = OrderItem.objects.filter(order=orderCheck, deliver=False)
        
        if orderDeliverRequest.exists():
            for request in orderDeliverRequest:
                request.wait_staff_assigned = wait_staff_assigned
                request.save()
            
            return Response("Notifications accepted", status=status.HTTP_200_OK)
        else:
            # If no notifications are found, return a response indicating that
            return Response("No notifications found for the provided table number and status", status=status.HTTP_404_NOT_FOUND)

class OrderDeliverNotificationCompleteView(APIView):
    def put(self, request):
        orderCheck  = request.data.get('order')
        
        orderRequest = OrderItem.objects.filter(order=orderCheck, deliver=False)
        
        if orderRequest.exists():
            for request in orderRequest:
                # Update status or perform other actions as needed
                request.deliver = True
                request.save()
            
            return Response("Notifications accepted", status=status.HTTP_200_OK)
        else:
            # If no notifications are found, return a response indicating that
            return Response("No notifications found for the provided table number and status", status=status.HTTP_404_NOT_FOUND)

class OrdersDeliverGetAllNotificationsView(APIView):
    def get(self, request):
        # Retrieve all assistance requests with tableStatus=False from the database
        order = OrderItem.objects.filter(deliver=False, is_ready=True)
        
        # Serialize the assistance data
        orderSerializer = OrderItemSerializer(order, many=True)
        
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
        
    
    