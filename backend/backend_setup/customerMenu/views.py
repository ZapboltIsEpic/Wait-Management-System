from django.shortcuts import render, redirect
from django.http import JsonResponse

from .models import MenuItem, Category
from .serializers import CategorySerializer, MenuItemSerializer

from rest_framework.decorators import api_view

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

@api_view(['GET','POST'])
def menuItem(request, categoryName, id):
    if request.method == 'GET':
        try:
            menuItem = MenuItem.objects.get(id=id)
            menuItem_serializer = MenuItemSerializer(menuItem)
            return JsonResponse(menuItem_serializer.data)
        
        except MenuItem.DoesNotExist:
            return JsonResponse({'message': 'Menu item does not exist'}, status=404)

def addMenuItem(request):
    if request.method == 'POST':
        menuItem_serializer = MenuItemSerializer(data = request.data) #serializes table list
        if menuItem_serializer.is_valid():
            menuItem_serializer.save()
            return Response(menuItem_serializer.data, status = status.HTTP_201_CREATED)
        return Response(menuItem_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    