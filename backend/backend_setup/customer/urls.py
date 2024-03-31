from django.urls import path
from . import views

urlpatterns = [
    path('order', views.createOrder, name='order-request'),

    ###### TO IMPLEMENT
    path('orders/<int:tableNumber>', views.viewCustomerOrder, name='view-orders'),
    
    ## To convene with Nam
    path('assistance', views.requestCustomerAssistance, name='assistance-request'),
    path('bill', views.requestCustomerBill, name='bill-request')
]
