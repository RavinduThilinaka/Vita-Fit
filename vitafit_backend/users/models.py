# users/models.py
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email address is required.')

        email = self.normalize_email(email)
        # Set default role to 'user' if not provided
        if 'role' not in extra_fields:
            extra_fields.setdefault('role', 'user')
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')  # Superuser gets admin role
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    # Add ROLE_CHOICES
    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
        ('trainer', 'Trainer'),
    )
    
    email = models.EmailField(max_length=200, unique=True)
    age = models.IntegerField(null=True, blank=True)

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    
    # Add role field
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []