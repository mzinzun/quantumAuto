from django.urls import path
from .views import api_technician, api_technician_detail, api_appointments, api_appointment_detail, api_appointment_cancel, api_appointment_finish

urlpatterns = [
    path("technicians/", api_technician, name='api_technician'),
    path("technicians/<int:pk>/", api_technician_detail, name="api_technician_detail" ),
    path("appointments/", api_appointments, name='api_appointments'),
    path("appointments/<int:pk>/", api_appointment_detail, name="api_appointment_detail" ),
    path("appointments/<int:pk>/cancel/", api_appointment_cancel, name="api_appointment_cancel" ),
    path("appointments/<int:pk>/finish/", api_appointment_finish, name="api_appointment_finish" ),
]