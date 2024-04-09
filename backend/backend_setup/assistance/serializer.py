# Import necessary modules
from rest_framework import serializers
from .models import Assistance

# Define serializer class
class AssistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assistance
<<<<<<< HEAD
        fields = ['id', 
                  'table', 
                  'staffName', 
                  'tableStatus']
=======
        fields = ['id', 'createdTime', 'table', 'staffAcceptedTime', 'staffName', 'tableStatus']
>>>>>>> main
