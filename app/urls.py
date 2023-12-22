from django.urls import path,include

#REST FRAMEWORK LIBRARY
from rest_framework import routers
from .views import(
    register_user,
    login_user,
    logout_user,
    get_user_details,
    Add_product,
    UserListView,
    UserListViewSet,
    ProductListView,
    ProductCreateView,
    ProductDeleteView,
    ProductUpdateView,
    ProductDetailView

)

router=routers.DefaultRouter()
router.register("list",UserListViewSet,basename='list')

urlpatterns=[
    path('register_user',register_user),
    path('login_user',login_user),
    path('logout_user',logout_user),
    path('get_user_details',get_user_details),
    path('user_list',UserListView.as_view()),
    path('product_list/',ProductListView.as_view()),
    path('product_list/<int:user_id>/', ProductListView.as_view(), name='product_list'),
    path('delete_product/<int:pk>/', ProductDeleteView.as_view(), name='delete_product'),
    path('update_product/<int:pk>', ProductUpdateView.as_view(), name='product_update'),
    path('get_product/<int:pk>/', ProductDetailView.as_view(), name='product_detail'),

    # path('add_product',ProductCreateView.as_view()),
    path('add_product',Add_product),
    path('api/',include(router.urls)),
    
]