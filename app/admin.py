from django.contrib import admin
from .models import CustomUser,Product,UserProfile,Category,Sub_Category


admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(UserProfile)
admin.site.register(Category)
admin.site.register(Sub_Category)
