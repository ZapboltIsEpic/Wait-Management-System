from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Assistance

# Import the serializer
from .serializer import AssistanceSerializer

class RequestNotificationView(APIView):
    def post(self, request):
        serializer = AssistanceSerializer(data=request.data)
        
        # Validate the serializer
        if serializer.is_valid():
            # Save the validated data
            serializer.save()
            # Return success response
            return Response("Notification request received", status=status.HTTP_200_OK)
        else:
            # Return error response if validation fails
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RequestNotificationCheckView(APIView):
    def get(self, request):
        most_recent_assistance_request = Assistance.objects.latest('createdTime').createdTime
        
        return Response({'most_recent_assistance_request': most_recent_assistance_request})
    
class NotificationAcceptedView(APIView):
    def put(self, request):
        tableCheck = request.data.get('table')
        staffName = request.data.get('staffName')
        tableStatusCheck = False
        
        assistanceRequest = Assistance.objects.filter(table=tableCheck, tableStatus=tableStatusCheck)
        
        if assistanceRequest.exists():
            for request in assistanceRequest:
                request.staffName = staffName
                request.save()
            
            return Response("Notifications accepted", status=status.HTTP_200_OK)
        else:
            # If no notifications are found, return a response indicating that
            return Response("No notifications found for the provided table number and status", status=status.HTTP_404_NOT_FOUND)

class NotificationCompleteView(APIView):
    def put(self, request):
        tableCheck = request.data.get('table')
        tableStatusCheck = False
        
        assistanceRequest = Assistance.objects.filter(table=tableCheck, tableStatus=tableStatusCheck)
        
        if assistanceRequest.exists():
            for request in assistanceRequest:
                # Update status or perform other actions as needed
                request.tableStatus = True
                request.save()
            
            return Response("Notifications accepted", status=status.HTTP_200_OK)
        else:
            # If no notifications are found, return a response indicating that
            return Response("No notifications found for the provided table number and status", status=status.HTTP_404_NOT_FOUND)

class GetAllNotificationsView(APIView):
    def get(self, request):
        # Retrieve all assistance requests with tableStatus=False from the database
        assistance = Assistance.objects.filter(tableStatus=False)
        
        # Serialize the assistance data
        assistanceSerializer = AssistanceSerializer(assistance, many=True)
        
        # Return the serialized data as a response
        return Response(assistanceSerializer.data, status=status.HTTP_200_OK)