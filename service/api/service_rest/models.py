from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField()

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default="created")
    vin = models.CharField(max_length=17, unique=False)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician, 
        related_name="appointments",
        on_delete=models.CASCADE,
        null=True
    )