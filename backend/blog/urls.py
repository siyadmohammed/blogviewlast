from django.urls import path
from .views import *

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/posts/', PostListView.as_view(), name='post-list'),
    path('api/posts/create/', CreatePostView.as_view(), name='post-create'),
    path('api/posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
]
