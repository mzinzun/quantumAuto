from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Technician, AutomobileVO, Appointment
from common.json import ModelEncoder
import json

# Create your views here.
class AutomobileEncoder(ModelEncoder):
    model= AutomobileVO
    properties = [
        "id", 
        'href', 
        "vin", 
        "sold"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name", 
        "last_name", 
        "employee_id"]
    
class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date-time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else: 
        try: 
            content= json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician, 
                encoder=TechnicianEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Technician Not Created"}
            )
            response.status_code = 400
            return response