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
       "id"
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
        try:
            content = json.loads(request.body)
            print("content", content)
            automobile = AutomobileVO.objects.get(vin=content['automobile'])
            content['automobile'] = automobile
            customer = Customer.objects.get(id=content['customer'])
            content['customer'] = customer
            salesperson = Salesperson.objects.get(id=content['salesperson'])
            content['salesperson'] = salesperson
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": 'AutomobileVO does not exist'},
                status=404
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": 'Customer does not exist'},
                status=404
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": 'Salesperson does not exist'},
                status=404
            )
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
            {"salespeople": sales_people},
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


@require_http_methods(["DELETE"])
def salesperson_delete(request, id):
    try:
        Salesperson.objects.get(id=id).delete()
        return JsonResponse(
            {"message": "Salesperson Deleted"},
            status=200
            )
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": 'Can Not Delete: Salesperson on Sale'},
            status=400
        )


@require_http_methods(["DELETE"])
def customer_delete(request, id):
    try:
        count, _ = Customer.objects.get(id=id).delete()
        return JsonResponse(
            {"message": "Customer Deleted"},
            status=200
        )
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": 'Can Not Delete: Customer on Sale'},
            status=404
            )


@require_http_methods(["DELETE"])
def sale_delete(request, id):
    try:
        Sale.objects.get(id=id).delete()
        return JsonResponse(
            {"message": "Salesperson Deleted"},
            status=200
        )
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": 'Sales does not exist!'},
            status=404
        )


@require_http_methods(["GET", "POST"])
def customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerDetailEncoder,
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
