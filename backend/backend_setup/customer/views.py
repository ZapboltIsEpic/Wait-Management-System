from django.shortcuts import render
from django.http import JsonResponse

from orders.models import Order
from waddlewait_app.models import Table
from orders.serializer import OrderSerializer, BillRequestSerializer
from assistance.serializer import AssistanceSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['POST'])
def createOrder(request):
    if request.method == 'POST':
        request_data = request.data # Form data sent in POST request
        table_number = request_data.get('table_number')
        items_data = request_data.get('items')

        if not table_number or not items_data: ## or not items_data:
            return JsonResponse({'message': 'Invalid input format'}, status=status.HTTP_400_BAD_REQUEST)
        
        order_serializer = OrderSerializer(data=request_data)
        if order_serializer.is_valid():
            order_serializer.validated_data['items'] = items_data # Assign table_number to validated data
            order_serializer.save()  # Save the serializer
            return JsonResponse({ "message": "Items added to order successfully"}, status=status.HTTP_201_CREATED)

        return JsonResponse({'message': 'Table number or order item not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def viewCustomerOrder(request, tableNumber):
    if request.method == 'GET':
        try:
            table = Table.objects.get(table_number=tableNumber)

            orders = Order.objects.filter(table=table)
            orders_serializer = OrderSerializer(orders, many = True)

            data = {
                'tableNumber': tableNumber,
                'orders': orders_serializer.data,
            }

            return JsonResponse(data)
        except:
            return JsonResponse({'message': 'Table number does not exist'}, status=status.HTTP_404_NOT_FOUND)
        

@api_view(['POST'])
def requestCustomerAssistance(request):
    if request.method == 'POST':

        request_data = request.data
        table_number = request_data.get('tableNumber')

        if not table_number:
            return JsonResponse({'message': 'Invalid input format'}, status=status.HTTP_400_BAD_REQUEST)

        assistance_serializer = AssistanceSerializer(data=request_data)
        if assistance_serializer.is_valid():
            assistance_serializer.save()
            return JsonResponse({ "message": "Assistance requested successfully"}, status=status.HTTP_201_CREATED)

        return JsonResponse({'message': 'Table number not found',
                             'error': assistance_serializer.errors}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def requestCustomerBill(request):
    if request.method == 'POST':

        request_data = request.data
        table_number = request_data.get('table_number')

        if not table_number:
            return JsonResponse({'message': 'Invalid input format'}, status=status.HTTP_400_BAD_REQUEST)

        bill_serializer = BillRequestSerializer(data=request_data)
        if bill_serializer.is_valid():
           bill_serializer.save()
           return JsonResponse({ "message": "Bill requested successfully"}, status=status.HTTP_201_CREATED)

        return JsonResponse({'message': 'Table number not found',
                             'errors': bill_serializer.errors}, status=status.HTTP_404_NOT_FOUND)