from django.urls import path
from sales_rest.views import list_autovo

urlpatterns = [
    path('autosVO', list_autovo, name='list_autovo'),
]
