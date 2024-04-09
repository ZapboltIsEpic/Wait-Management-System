from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Sum
from django.db import transaction

from collections import defaultdict, Counter
from orders.models import Order, OrderItem, BillRequest
from waddlewait_app.models import Table
from assistance.models import Assistance
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
        table = request_data.get('table')
        items_data = request_data.get('items')
<<<<<<< HEAD

        if not table or not items_data: ## or not items_data:
=======
        
        # print(items_data)
        if not table_number or not items_data: ## or not items_data:
>>>>>>> main
            return JsonResponse({'message': 'Invalid input format'}, status=status.HTTP_400_BAD_REQUEST)
        
        total_bill = sum(float(item['price']) for item in items_data)
        request_data['bill'] =  total_bill

        order_serializer = OrderSerializer(data=request_data)

        if order_serializer.is_valid():
            order_instance = order_serializer.save()  # Save the serializer

            item_counts = Counter(item_data['id'] for item_data in items_data)
<<<<<<< HEAD
            
            for item_id in item_counts.keys():
=======
            for item_data in items_data:
                key = item_data['id']
>>>>>>> main
                order_item_data = {
                    'order': order_instance.id,
                    'item': key,
                    'quantity': item_counts[key]
                }
                print(order_item_data)

                order_item_serializer = OrderItemSerializer(data=order_item_data)

                if order_item_serializer.is_valid():
                    order_item_serializer.save()
                else:
                    return JsonResponse({'message': 'Invalid item data'}, status=status.HTTP_400_BAD_REQUEST)

            return JsonResponse({"message": "Items added to order successfully",
                                 'total_amount': total_bill}, status=status.HTTP_201_CREATED)

        return JsonResponse({'message': 'Invalid order data'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def viewCustomerOrder(request, table):
    if request.method == 'GET':
        try:
            table = Table.objects.get(table_number=table)

            orders = Order.objects.filter(table=table)
            orders_serializer = OrderSerializer(orders, many = True)

            data = {
                'table': table,
                'orders': orders_serializer.data,
            }

            return JsonResponse(data)
        except:
            return JsonResponse({'message': 'Table number does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def viewPastOrderedItems(request, table):
    if request.method == 'GET':
        try:
            tableObj = Table.objects.get(table_number=table)
            
            orderItems= OrderItem.objects.filter(order__table=tableObj)
            orderItems_serializer = OrderItemSerializer(orderItems, many = True)

            return Response(orderItems_serializer.data)  
        except:
            return JsonResponse({'message': 'Table number does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def requestCustomerAssistance(request):
    if request.method == 'POST':
<<<<<<< HEAD

        table = request.data.get('table')
        if not table:
            return JsonResponse({'message': 'Invalid input format'}, status=status.HTTP_400_BAD_REQUEST)
        
        existingAssistance = Assistance.objects.filter(table=table, tableStatus=False).exists()
        if existingAssistance:
            return JsonResponse({'message': 'Assistance request for table already sent'}, status=status.HTTP_200_OK)
=======
        table_number = request.data.get('table_number')
        if table_number is None:
            return JsonResponse({'message': 'Invalid input format'}, status=status.HTTP_400_BAD_REQUEST)
        existingAssistance = Assistance.objects.filter(table=table_number, tableStatus=False).exists()
        if existingAssistance:
            return JsonResponse({'message': 'Assistance request for table already sent'}, status=status.HTTP_200_OK)
        req_data = {
            'table': table_number
        }
>>>>>>> main

        assistance_serializer = AssistanceSerializer(data=request.data)
        if assistance_serializer.is_valid():
            assistance_serializer.save()
            return JsonResponse({ "message": "Assistance requested successfully"}, status=status.HTTP_201_CREATED)
        return JsonResponse({'message': 'Table number not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def requestCustomerBill(request):
    if request.method == 'POST':
        request_data = request.data
<<<<<<< HEAD
        table = request_data.get('table')

        if not table:
            return JsonResponse({'message': 'Invalid input format'}, status=status.HTTP_400_BAD_REQUEST)

        existingBillRequest = BillRequest.objects.filter(table=table, request_status=False).exists()
        if existingBillRequest:
            return JsonResponse({'message': 'Bill request for table already sent'}, status=status.HTTP_200_OK)

        orders = Order.objects.filter(table=table)
=======
        table_number = request_data.get('table_number')
        
        if not table_number:
            return JsonResponse({'message': 'Invalid input format'}, status=status.HTTP_400_BAD_REQUEST)
        existingBillRequest = BillRequest.objects.filter(table_id=table_number, request_status=False).exists()
    
        if existingBillRequest:
            return JsonResponse({'message': 'Bill request for table already sent'}, status=status.HTTP_200_OK)
        orders = Order.objects.filter(table_id=table_number)
>>>>>>> main

        if not orders.exists():
            return JsonResponse({'message': 'No orders found for the table number'}, status=status.HTTP_404_NOT_FOUND)
        total_amount = orders.aggregate(total=Sum('bill'))['total']
        if total_amount is None:
            return JsonResponse({'message': 'No bill available for the table number'}, status=status.HTTP_404_NOT_FOUND)

        request_data['total_amount'] = total_amount
        request_data['staff_name'] = "tempStaffName"
        request_data['request_status'] = False
        request_data['table_id'] = table_number

        bill_serializer = BillRequestSerializer(data=request_data)
<<<<<<< HEAD
        if bill_serializer.is_valid():
           with transaction.atomic():
                bill_serializer.save() 
                orders.delete()  

           return JsonResponse({'total_amount': total_amount, 
                                'message': "Bill requested successfully"}, status=status.HTTP_201_CREATED)
=======
>>>>>>> main

        if bill_serializer.is_valid():
            bill_serializer.save()
            return JsonResponse({'total_amount': total_amount, 
                'message': "Bill requested successfully"}, status=status.HTTP_201_CREATED)
        return JsonResponse({'message': 'Table number not found'}, status=status.HTTP_404_NOT_FOUND)