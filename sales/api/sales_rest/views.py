from django.shortcuts import render
from common.json import ModelEncoder
from sales_rest.models import AutomobileVO
from django.http import JsonResponse


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "id"
    ]


# Create your views here.


def list_autovo(request):
    autos = AutomobileVO.objects.all()
    print("autos", autos)
    return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVOEncoder
        )
