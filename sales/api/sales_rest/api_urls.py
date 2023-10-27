from django.urls import path
from sales_rest.api_views import (
    list_autovo,
    salespeople,
    customers,
    sales,
    delete_salesperson,
    customer_delete,
    delete_sale
)

urlpatterns = [
    path('customers/', customers, name="customers"),
    path('customers/<int:id>/', customer_delete, name="delete_customer"),
    path('salespeople/', salespeople, name="salesperson"),
    path('salespeople/<int:id>/', delete_salesperson, name="delete_salesperson"),
    path('sales/', sales, name="sales"),
    path('sales/<int:id>/', delete_sale, name="delete_sale"),
    path('autosVO/', list_autovo, name='list_autovo'),
]
