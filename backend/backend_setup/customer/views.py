from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Sum

from collections import defaultdict, Counter
from orders.models import Order
from waddlewait_app.models import Table
from orders.serializer import OrderSerializer, BillRequestSerializer, OrderItemSerializer
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
        
        total_bill = sum(item['price'] for item in items_data)

        order_data = {
            'table': table_number,
            'bill' : total_bill
        }

        order_serializer = OrderSerializer(data=order_data)

        if order_serializer.is_valid():
            order_instance = order_serializer.save()  # Save the serializer

            item_counts = Counter(item_data['id'] for item_data in items_data)
            
            for item_id in item_counts.keys():
                # item_id, quantity = item_data.items()
                order_item_data = {
                    'order': order_instance.id,
                    'item': item_id,
                    'quantity': item_counts[item_id]
                }

                order_item_serializer = OrderItemSerializer(data=order_item_data)

                if order_item_serializer.is_valid():
                    order_item_serializer.save()
                else:
                    return JsonResponse({'message': 'Invalid item data'}, status=status.HTTP_400_BAD_REQUEST)

            return JsonResponse({"message": "Items added to order successfully",
                                 'total_amount': total_bill}, status=status.HTTP_201_CREATED)

        return JsonResponse({'message': 'Invalid order data'}, status=status.HTTP_404_NOT_FOUND)

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

        orders = Order.objects.filter(table=table_number)

        if not orders.exists():
            return JsonResponse({'message': 'No orders found for the table number'}, status=status.HTTP_404_NOT_FOUND)

        total_amount = orders.aggregate(total=Sum('bill'))['total']
        if total_amount is None:
            return JsonResponse({'message': 'No bill available for the table number'}, status=status.HTTP_404_NOT_FOUND)

        request_data['total_amount'] = total_amount

        bill_serializer = BillRequestSerializer(data=request_data)
        if bill_serializer.is_valid():
           bill_serializer.save()
           return JsonResponse({'total_amount': total_amount, 
                                'message': "Bill requested successfully"}, status=status.HTTP_201_CREATED)

        return JsonResponse({'message': 'Table number not found',
                             'errors': bill_serializer.errors}, status=status.HTTP_404_NOT_FOUND)