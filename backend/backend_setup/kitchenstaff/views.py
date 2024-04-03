from django.shortcuts import render
from django.http import JsonResponse

from orders.models import Order, OrderItem
from orders.serializer import OrderSerializer, OrderItemSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['GET'])
def pendingOrders(request):
    if request.method == 'GET':
        orders = Order.objects.filter(is_complete=False).order_by('created_at')

        orders_data = []
        for order in orders:
            order_data = OrderSerializer(order).data
            order_items = OrderItem.objects.filter(order=order)
            order_items_data = OrderItemSerializer(order_items, many=True).data
            order_data['items'] = order_items_data
            orders_data.append(order_data)

        return Response(orders_data)

@api_view(['GET'])
def newestOrder(request):
    if request.method == 'GET':
        order = Order.objects.latest('created_at')
        order_data = OrderSerializer(order).data
        
        order_items = OrderItem.objects.filter(order=order)
        order_items_data = OrderItemSerializer(order_items, many=True).data
        order_data['items'] = order_items_data
        return Response(order_data)

@api_view(['GET'])
def completedOrders(request):
    if request.method == 'GET':
        orders = Order.objects.filter(is_complete=True).order_by('created_at')

        orders_data = []
        for order in orders:
            order_data = OrderSerializer(order).data
            order_items = OrderItem.objects.filter(order=order)
            order_items_data = OrderItemSerializer(order_items, many=True).data
            order_data['items'] = order_items_data
            orders_data.append(order_data)

        return Response(orders_data)


@api_view(['PUT'])
def markItemAsPreparing(request, orderId, itemId):
    if request.method == 'PUT':
        order_item = OrderItem.objects.get(order_id=orderId, pk=itemId)
        order_item.is_preparing = True
        order_item.save()

        return JsonResponse({'message': 'Order item marked as preparing'}, status=status.HTTP_200_OK)
    
@api_view(['PUT'])
def markItemAsReady(request, orderId, itemId):
    if request.method == 'PUT':
        order_item = OrderItem.objects.get(order_id=orderId, pk=itemId)
        order_item.is_ready = True
        order_item.save()

        return JsonResponse({'message': 'Order item marked as ready'}, status=status.HTTP_200_OK)
    
@api_view(['PUT'])
def completeOrder(request, orderId):
    if request.method == 'PUT':
        order = Order.objects.get(pk=orderId)
        order.is_complete = True
        order.save()

        return JsonResponse({'message': 'Order marked as completed'}, status=status.HTTP_200_OK)