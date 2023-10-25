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
        
        
@require_http_methods("DELETE")
def api_technician_detail (request, pk):
    try:
        count,_=Technician.objects.filter(id=pk).delete()
        response = JsonResponse({"deleted": count > 0})
        response.status_code = 200
    
    except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response



@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
    else: 
        try: 
            content = json.loads(request.body)
            print("content:", content)
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            # print("tech:", technician)
            content["technician"] = technician
        

            
            try:
                automobile_vo = AutomobileVO.objects.get(vin=content["vin"])
                # print("car:", str(automobile_vo.vin) == str(content["vin"]))
                # print(content)
                if automobile_vo.vin == content["vin"]:
                    content["vip"] = True
                    
            except AutomobileVO.DoesNotExist:
                print("We did not sell this Car")

            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )

        except json.JSONDecodeError as e:
            print("JSON Parsing Error:", str(e))
            response = JsonResponse(
                {"message": "Appointment Not Created"}
            )
            response.status_code = 404
            return response
        
@require_http_methods(["GET","DELETE"])
def api_appointment_detail (request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Appointment does not Exist"})
            response.status_code = 404
            return response
    else:
        try:
            count,_=Appointment.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except:
            response = JsonResponse({"message": "Appointment not Deleted"})
            response.status_code = 400
            return response
        

@require_http_methods(["PUT"])
def api_appointment_cancel(request, pk):
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
def api_appointment_finish(request, pk):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=pk)
        except:
            response = JsonResponse({"message": "Appointment does not Exist"})
            response.status_code = 404
            return response
        appointment.status = 'finished'
        appointment.save()
        return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        