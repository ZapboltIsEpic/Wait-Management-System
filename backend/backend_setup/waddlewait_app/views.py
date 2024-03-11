from django.shortcuts import render
from django.http import JsonResponse
from .models import Table
from .serializers import TableSerializer, TableBookingSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['GET', 'POST'])
def table_list(request):

    if request.method == 'GET':
        #gets all the tables as json
        tables = Table.objects.all()
        tables_serializer = TableSerializer(tables, many = True) #serializes table list
        return JsonResponse(tables_serializer.data, safe = False)
    if request.method == 'POST':
        tables_serializer = TableSerializer(data = request.data) #serializes table list
        if tables_serializer.is_valid():
            tables_serializer.save()
            return Response(tables_serializer.data, status = status.HTTP_201_CREATED)



@api_view(['GET', 'PUT'])
def table_detail(request, table_number):
    try:
        print(Table.objects)
        table = Table.objects.get(pk = table_number)
    except Table.DoesNotExist:
        return Response(str(Table.objects.values_list('pk', flat=True)),status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TableSerializer(table)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = TableBookingSerializer(table, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
