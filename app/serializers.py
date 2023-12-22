from rest_framework import serializers
from .models import Category,Sub_Category,UserProfile,Product
from django.conf import settings
from django.contrib.auth import get_user_model

User=get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Using your custom CustomUser model
        fields = ('id', 'username', 'email', 'is_active', 'is_staff', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields='__all__'
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        modle=Category
        fields='__all__'
class Sub_CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Sub_Category
        fields='__all__'
class ProductSerializer(serializers.ModelSerializer):
    # ... other fields ...

    class Meta:
        model = Product
        fields = '__all__'

    def get_user(self, obj):
         user = obj.user
         return {
             "id": user.id,
             "username": user.username
         }
