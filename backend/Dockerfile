# Use Python 3.11 as the base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /code

# Copy requirements.txt and install dependencies
COPY requirements.txt /code/

RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code, including the blog app
COPY . /code/

# Expose port 8000
EXPOSE 8000

# Command to run the Django app using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "blog_project.wsgi:application"]