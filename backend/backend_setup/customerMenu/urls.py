from django.urls import path
from . import views

urlpatterns = [
    path('', views.menu, name='menu'),
    path('<str:categoryName>/',views.menuItemsByCategory, name='categoryName'),
    path('<str:categoryName>/<int:pk>/', views.menuItem, name='item'),
    path('<str:categoryName>/add', views.addMenuItem)
]