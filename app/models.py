from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser

class CustomUserManager(BaseUserManager):      #create customise user 
    def create_user(self,username,email,password=None,**extra_fields):
        email=self.normalize_email(email)    #to lowercase
        user=self.model(username=username,email=email,**extra_fields)  
        user.set_password(password)
        user.save(using=self._db)             #saving user to db
        return user

    def create_superuser(self,username,email,password=None,**extra_fields):
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("is_active",True)
        return self.create_user(username,email,password,**extra_fields)

class CustomUser(AbstractBaseUser):
    username=models.CharField(max_length=50,unique=True)
    email=models.EmailField(unique=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    objects=CustomUserManager()

    USERNAME_FIELD='username'  #Set username as the USERNAME_FIELD
    EMAIL_FIELD='email'         
    REQUIRED_FIELDS=["email"]   

    def __str__(self):
        return self.username
    def get_full_name(self):
        return self.username
    def has_perm(self,perm,obj=None):
        "Does the user have a specific permission?"
        return self.is_staff
    def has_module_perms(self,app_label):
        "Does the user have permission to view the app `app_label`?"
        return True

class UserProfile(models.Model):
    user=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    bio=models.TextField(blank=True)
    profile_picture=models.ImageField(upload_to='media/profile/',blank=True,null=True)
    dob=models.DateField(null=True)
    address=models.CharField(max_length=100,null=True)
    contact=models.CharField(max_length=10,null=True)
    def __str__(self):
        return self.user.username

class Product(models.Model):
    name=models.CharField(max_length=100,null=True)
    price=models.IntegerField(null=True)
    topic=models.CharField(max_length=100,null=True)
    desc=models.TextField(max_length=500,null=True)
    date=models.DateTimeField(null=True)
    author=models.CharField(max_length=100,null=True)
    field=models.CharField(max_length=100,null=True)
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    # category=models.ForeignKey(Sub_Category,on_delete=models.CASCADE)
    def __str__(self):
        return self.name




























class Category(models.Model):
    name=models.CharField(max_length=100,null=True)
    def __str__(self):
        return self.name
class Sub_Category(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE,null=True)
    name=models.CharField(max_length=100,null=True)
    def __str__(self):
        return self.name+"  "+self.category.name