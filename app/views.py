from django.shortcuts import render
from datetime import datetime
from django.contrib.auth import authenticate,login,logout
from .serializers import CustomUserSerializer,ProductSerializer,CategorySerializer,Sub_CategorySerializer
from .models import CustomUser,Product,Category,Sub_Category,UserProfile
#Rest framework Import
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.generics import ListAPIView,CreateAPIView,UpdateAPIView,DestroyAPIView,RetrieveAPIView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny






@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer=CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        
        return Response({"success":True},status=200)
    return Response(serializer.errors, status=401)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    staff="no"
    username=request.data.get("username")
    password=request.data.get("password")
    user=authenticate(request,username=username,password=password)
    if user is not None:
        login(request,user)
        if user is staff:
            staff="yes"
        return Response({"Response":"Login Successfull","staff":staff},status=200)
    else:
        return Response({"error":"Invalid credentials","staff":staff},status=401)

@api_view(['POST'])
def logout_user(request):
    logout(request)
    response=Response({'message':'Logged out successfully'},status=200)
    response.delete_cookie('access_token')
    return response

@api_view(['GET'])
def get_user_details(request):
    user = request.user
    user_details = {
        'id':user.id,
        'username': user.username,
        'email': user.email,
       
    }
    return Response(user_details)


@api_view(['POST'])
def Add_product(request):
    print(request.user)
    print(request.data)
   
    request_data = request.data.copy()
    request_data['user'] = request.user.pk 
    request_data['date'] = datetime.now()
  
    request_data['date'] = datetime.now()
    print(request.data)
    serializer = ProductSerializer(data=request_data)
    
    if serializer.is_valid(raise_exception=True):
        
        serializer.save(user=request.user)
        print(serializer)
        return Response(serializer.data, status=200)
    else:
        print(serializer.errors)

    return Response({"error": "Something error"}, status=400)















class UserListView(generics.ListAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=CustomUserSerializer


@permission_classes([AllowAny])
class ProductListView(generics.ListAPIView):
    # queryset=Product.objects.all()
    serializer_class=ProductSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')  
        if user_id:
            return Product.objects.filter(user_id=user_id)
        else: 
            return Product.objects.all()

class ProductCreateView(generics.ListAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer

class ProductDeleteView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        print(instance)
        instance.delete()
        return Response(status=204)
    

class ProductUpdateView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer





























# class CategoryCreateView(generics.CreateAPIView):
#     queryset=Category.objects.all()
#     serializer_class=CategorySerializer
# class Sub_CategoryCreateView(generics.CreateAPIView):
#     queryset=Sub_Category.objects.all()
#     serializer_class=Sub_CategorySerializer






class UserListViewSet(viewsets.ModelViewSet):
    queryset=CustomUser.objects.all()
    serializer_class=CustomUserSerializer