from django.urls import path
from . import views

urlpatterns = [
    path('order', views.createOrder, name='order-request'),
    path('orders/<int:tableNumber>', views.viewCustomerOrder, name='view-orders'),
    path('ordered/<int:tableNumber>', views.viewPastOrderedItems, name='view-past-order-items'),
    path('assistance', views.requestCustomerAssistance, name='assistance-request'),
    path('bill', views.requestCustomerBill, name='bill-request')
]
