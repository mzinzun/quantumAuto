from django.urls import path
from .views import api_technician

urlpatterns = [
    path("technicians/", api_technician, name='api_technician')
]