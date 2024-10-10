from django.contrib.auth import authenticate, login
from rest_framework import generics, permissions, status
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import BlogPost, CustomUser
from .serializers import RegisterSerializer, UserSerializer, BlogPostSerializer  # Import serializers
from rest_framework.authtoken.models import Token


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = True  # Allow partial updates
        instance = self.get_object()

        # Handle file uploads separately (profile_photo will be in request.FILES)
        data = request.data.copy()
        if 'profile_photo' in request.FILES:
            data['profile_photo'] = request.FILES['profile_photo']

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Check for authentication
        user = authenticate(username=username, password=password)
        login(request, user)  # Log in the user

        # Get or create a token for the user
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "message": "Login successful",
            "token": token.key  # Send token in response
        }, status=status.HTTP_200_OK)


class CreatePostView(generics.CreateAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostListView(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter posts to return only those created by the logged-in user
        return BlogPost.objects.filter(author=self.request.user)  # Filter by the logged-in user


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure users can only edit or delete their own posts
        return self.queryset.filter(author=self.request.user)
