from django.urls import path
from . import views

urlpatterns = [
    path('', views.menu, name='menu'),
    path('<str:categoryName>/',views.menuItemsByCategory, name='category-items'),
    path('<str:categoryName>/<int:pk>/', views.menuItem, name='menu-item'),
    path('<str:categoryName>/add/', views.addMenuItem, name='add-menu-item'),
    path('modify/<int:pk>/', views.modifyMenuItem, name='modify-menu-item'),
    path('order/categorised/<int:pk>/', views.modifyMenuItem, name='modify-menu-item'), #pk is category id
    path('categories', views.categories, name ="category")
]