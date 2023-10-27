from django.db import models

# Create your models here.


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=50, unique=True)


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city_state = models.CharField(max_length=100)
    zip = models.CharField(max_length=15)
    phone_number = models.CharField(max_length=20)


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name='cars',
        on_delete=models.PROTECT
        )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.PROTECT)
    customer = models.ForeignKey(
        Customer,
        related_name='customers',
        on_delete=models.PROTECT
        )
    price = models.FloatField()
