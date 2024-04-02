from django.urls import path
from . import views

urlpatterns = [
    path('', views.menu, name='menu'),
    path('modify/<int:pk>/', views.modifyMenuItem, name='modify-menu-item'),
    path('categories', views.categories, name ="category"),
    path('order/categorised/<int:pk>/', views.modifyMenuOrder, name='modify-menu-item'), #pk is category id
    path('order/categories', views.modifyCategoryOrder, name ="category"),
    path('<str:categoryName>/',views.menuItemsByCategory, name='category-items'),
    path('<str:categoryName>/<int:pk>/', views.menuItem, name='menu-item'),
    path('<str:categoryName>/add/', views.addMenuItem, name='add-menu-item'),
]