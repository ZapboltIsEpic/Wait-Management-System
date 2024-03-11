from rest_framework import serializers
from .models import Category, MenuItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]


class MenuItemSerializer(serializers.ModelSerializer):

    category = CategorySerializer()

    class Meta:
        model = MenuItem
        fields = ["id", 
                  "name", 
                  "description", 
                  "price", 
                  "category"]
    
    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category = Category.objects.get(name=category_data['name'])
        menu_item = MenuItem.objects.create(category=category, **validated_data)
        return menu_item

        