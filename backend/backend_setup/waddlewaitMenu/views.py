from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse

from .models import MenuItem, Category
from .serializers import CategorySerializer, MenuItemSerializer, MenuItemUpdateSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['GET'])
def menu(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        menuItems  = MenuItem.objects.all()

        # Serialize the queryset
        categories_serializer = CategorySerializer(categories, many = True)
        menuItems_serializer = MenuItemSerializer(menuItems, many = True)

        data = {
            'categories': categories_serializer.data, 
            'menuItems': menuItems_serializer.data,
        }
        
        return JsonResponse(data)

@api_view(['GET','POST'])
def menuItemsByCategory(request, categoryName):
    if request.method == 'GET':
        try:
            category = Category.objects.get(name=categoryName)

            menuItems = MenuItem.objects.filter(category=category)
            menuItems_serializer = MenuItemSerializer(menuItems, many = True)

            data = {
                'category': categoryName, 
                'menuItems': menuItems_serializer.data,
            }

            return JsonResponse(data)
        except:
            return JsonResponse({'message': 'Menu category does not exist'}, status=404)

    
    if request.method == 'POST':
        inputData = {
            'name' : categoryName,
        }
        category_serializer = CategorySerializer(data = inputData)
        if category_serializer.is_valid():
            category_serializer.save()
            return Response(category_serializer.data, status.HTTP_201_CREATED)
        return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
def menuItem(request, categoryName, id):
    if request.method == 'GET':
        menu_item = get_object_or_404(MenuItem, pk=id)
        menu_item_serializer = MenuItemSerializer(menu_item)
        return JsonResponse(menu_item_serializer.data)

@api_view(['POST'])
def addMenuItem(request, categoryName):
    if request.method == 'POST':
        
        data = {
            'name': request.query_params.get('name'),
            'description': request.query_params.get('description'),
            'price': request.query_params.get('price'),
            'category': {'name' : categoryName}
        }

        #category = get_object_or_404(Category, name=categoryName)
        #data['category'] = category
        menu_item_serializer = MenuItemSerializer(data=data)

        if menu_item_serializer.is_valid():
            menu_item_serializer.save()
            return Response(menu_item_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(menu_item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'DELETE'])
def modifyMenuItem(request, id):
    
    try:
        menu_item = MenuItem.objects.get(pk = id)
    except MenuItem.DoesNotExist:
        return Response(str(MenuItem.objects.values_list('pk', flat=True)),status=status.HTTP_404_NOT_FOUND)


    if request.method == 'PUT':
        #serializer_full = MenuItemSerializer(menu_item)
        serializer = MenuItemUpdateSerializer(menu_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        serializer = MenuItemSerializer(menu_item)
        if serializer.is_valid():
            serializer.delete()
            return Response(f"Deleted: {id}", status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def categories(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many = True)
        return JsonResponse(categories_serializer)
    
    if request.method == 'POST':
        inputData = {
            'name' : request.query_params.get('name')
        }
        categories_serializer = CategorySerializer(inputData, many = True)
        if categories_serializer.is_valid():
            categories_serializer.save()
            return Response(categories_serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def modifyMenuOrder(request, id):
        if request.method == 'GET':
        orders = Order.objects.filter(is_completed=True)
        orders_serializer = OrderSerializer(orders, many=True)

        return JsonResponse(orders_serializer.data)

    try:
        menu_item = Category.objects.get(pk = id)
    except MenuItem.DoesNotExist:
        return Response(str(MenuItem.objects.values_list('pk', flat=True)),status=status.HTTP_404_NOT_FOUND)


    if request.method == 'PUT':
        #serializer_full = MenuItemSerializer(menu_item)
        serializer = MenuItemUpdateSerializer(menu_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        serializer = MenuItemSerializer(menu_item)
        if serializer.is_valid():
            serializer.delete()
            return Response(f"Deleted: {id}", status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)