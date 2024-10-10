import os
import sys

# Add directories to sys.path and print them for debugging purposes.
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

print("Current Python Path:", sys.path)  # Print Python path for debugging

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_project.settings')

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()