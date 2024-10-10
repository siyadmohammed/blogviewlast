from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import BlogPost, CustomUser

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # Use your custom user model
        fields = ['id', 'username', 'email', 'profile_photo']  # Include profile_photo

    def update(self, instance, validated_data):
        profile_photo = validated_data.get('profile_photo', None)
        if profile_photo:
            instance.profile_photo = profile_photo  # Update profile photo

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        return instance


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'tags', 'author', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']
