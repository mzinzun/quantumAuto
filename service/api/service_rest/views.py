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
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "vip",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_technician(request):
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
            return JsonResponse(
                {"message": "Technician Not Created"},
                status = 400
            )
            
@require_http_methods("DELETE")
def api_detail_technician (request, pk):
    try:
        technician=Technician.objects.get(id=pk)
        technician.delete()
        return JsonResponse(
            {"message":"Tech Deleted"},
            status=200
        )
    except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Does not Exist"},
                status = 404
            )

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe = False
        )
    else: 
        content = json.loads(request.body)

        try: 
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician

            try:
                automobile_vo = AutomobileVO.objects.get(vin=content["vin"])
                if automobile_vo.vin == content["vin"]:
                    content["vip"] = True  
            except AutomobileVO.DoesNotExist:
                print("We did not sell this Car")

        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician doesnt exist"}, status=400)

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["GET","DELETE"])
def api_detail_appointment (request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
               {"message": "Technician Deleted  "},
               status = 200
            )
        except:
            return JsonResponse(
                {"message": "Appointment does not Exist"},
                status = 400
                )

    else:
        try:
            appointment=Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
               {"message":"Appointment Deleted"},
               status=200
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment not Deleted"},
                  status = 400)

@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
        except:
            response = JsonResponse({"message": "Appointment does not Exist"})
            response.status_code = 404
            return response
        appointment.status = 'canceled'
        appointment.save()
        return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
        except:
            return JsonResponse(
                {"message": "Appointment does not Exist"},
                status = 404
                )

        appointment.status = 'finished'
        appointment.save()
        
        return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        