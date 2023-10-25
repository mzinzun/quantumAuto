from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from sales_rest.models import Salesperson, AutomobileVO, Customer, Sale


class CustomerDetailEncoder(ModelEncoder):
    model = Customer,
    properties = [
       "first_name",
       "last_name",
       "address",
       "city_state",
       "zip",
       "phone_number",
       "id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer,
    properties = [
       "first_name",
       "last_name",
       "id"
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson,
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "id"
    ]


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
       "automobile",
       "salesperson",
       "customer",
       "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder()
    }

# Create your views here.


@require_http_methods(["GET", "POST"])
def sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
        )
    else:
        content = json.loads(request.body)
        print("content", content)
        automobile = AutomobileVO.objects.get(id=content['automobile'])
        content['automobile'] = automobile
        customer = Customer.objects.get(id=content['customer'])
        content['customer'] = customer
        salesperson = Salesperson.objects.get(id=content['salesperson'])
        content['salesperson'] = salesperson
        print("content", content)
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SalesEncoder,
            safe=False
        )
@require_http_methods(["GET", "PUT", "DELETE"])
def edit_sales(request,id):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
        )
    else:
        content = json.loads(request.body)
        print("content", content)
        automobile = AutomobileVO.objects.get(id=content['automobile'])
        content['automobile'] = automobile
        customer = Customer.objects.get(id=content['customer'])
        content['customer'] = customer
        salesperson = Salesperson.objects.get(id=content['salesperson'])
        content['salesperson'] = salesperson
        print("content", content)
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SalesEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def salespeople(request):
    if request.method == "GET":
        sales_people = Salesperson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        print("content", content)
        sales_person = Salesperson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalespersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "DELETE"])
def delete_salesperson(request, id):
    try:
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Exception:
        response = JsonResponse({"message": 'Can Not Delete: Salesperson on Sale'})
        response.status_code = 400
        return JsonResponse()


@require_http_methods(["GET", "DELETE"])
def delete_customer(request, id):
    try:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Exception:
        response = JsonResponse({"message": 'Can Not Delete: Customer on Sale'})
        response.status_code = 400
        return JsonResponse()


def delete_sale(request, id):
    try:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Exception:
        response = JsonResponse({"message": 'Can Not Delete: Something is wrong!'})
        response.status_code = 400
        return JsonResponse()


@require_http_methods(["GET", "POST"])
def customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        print("content", content)
    customer = Customer.objects.create(**content)
    return JsonResponse(
        customer,
        encoder=CustomerDetailEncoder,
        safe=False
    )


def list_autovo(request):
    autos = AutomobileVO.objects.all()
    print("autos", autos)
    return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVOEncoder
        )
