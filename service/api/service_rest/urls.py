from django.urls import path
from .views import api_list_technician, api_detail_technician, api_list_appointments, api_detail_appointment, api_cancel_appointment, api_finish_appointment

urlpatterns = [
    path("technicians/", api_list_technician, name='api_technician'),
    path("technicians/<int:pk>/", api_detail_technician, name="api_technician_detail" ),
    path("appointments/", api_list_appointments, name='api_appointments'),
    path("appointments/<int:pk>/", api_detail_appointment, name="api_appointment_detail" ),
    path("appointments/<int:pk>/cancel/", api_cancel_appointment, name="api_appointment_cancel" ),
    path("appointments/<int:pk>/finish/", api_finish_appointment, name="api_appointment_finish" ),
]