# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'password',
            'first_name',
            'last_name',
            'age',
            'gender',
            'role'  # Add role to registration
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'required': False}  # Role is optional, defaults to 'user'
        }

    def create(self, validated_data):
        # Ensure role is set to 'user' if not provided
        if 'role' not in validated_data:
            validated_data['role'] = 'user'
        user = User.objects.create_user(**validated_data)
        return user


# User serializer with role included
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'age',
            'gender',
            'role'  # Include role in response
        )