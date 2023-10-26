# CarCar

Team:

* Michael Z- Sales
* John Z - Services

## Design
![alt text](/img/projectDiagram.png "Project overview")

## To Run:
After cloning the repo run the following commands:
- cd into directory of repo and open docker desktop

- docker-compose build
- docker-compose up
- use UI to:
    - create a Manufacturer, Model, and Automobile (in that order), in the Inventory dropdown.
    - create a Technician and Appointment (in that order) in the Services drop down
    - create a Salesperson, Customer and Sale (in that order) in the Sales drop down
    



## Inventory Monolith - Port 8100:8000

- Endpoints: 

    + Manufactures - : the company that manufactures the automobile
        - List manufacturers : "GET"  manufacturers/
        - Create a manufacturer : "POST"  manufacturers/
        - Get a specific manufacturer : "GET"  manufacturers/:id/
        - Update a specific manufacturer : "PUT"  manufacturers/:id/
        - Delete a specific manufacturer : "DELETE"  manufacturers/:id/

    + VehicleModel: the model of a vehicle created by the manufacturer
        - List vehicle models : "GET"  models/
        - Create a vehicle model : "POST"  models/
        - Get a specific vehicle model : "GET"  models/:id/
        - Update a specific vehicle model : "PUT"  models/:id/
        - Delete a specific vehicle model : "DELETE"  models/:id/

    + Automobile: the actual automobile of a specific vehicle model
        - List automobiles : "GET"  automobiles/
        - Create an automobile : "POST"  automobiles/
        - Get a specific automobile : "GET"  automobiles/:vin/
        - Update a specific automobile : "PUT"  automobiles/:vin/
        - Delete a specific automobile : "DELETE"  /automobiles/:vin/



## Service microservice - Port 8080:8000
![alt text](/img/serviceDiagram.png "Project overview")
- Endpoints:
    + Technician -  an employee that services automobiles during an appointment
        - List technicians : "GET"  technicians/
        - Create a technician	: "POST"  technicians/
        - Delete a specific technician : "DELETE"  technicians/:id/s

    + Appointments - allows a service concierge to enter an appointment
        - List appointments : "GET"  appointments/
        - Create an appointment : "POST"  appointments/
        - Delete an appointment : "DELETE"  appointments/:id/
        - Set appointment status to "canceled" : "PUT"  appointments/:id/cancel/
        - Set appointment status to "finished" : "PUT"  appointments/:id/finish/

- Models
    + Technician Model:
        - First Name
        - Last Name
        - Employee Id

    + Appointment Model:
        - Date Time - 
        - Reason -
        - Status
        - Vin - not neccassarily unique
        - Customer
        - VIP
        - Technician - is a foreign Key and has a related name of appointment

    + AutomobileVO Model : This is populated from the Inventory API via a Poller.  Poller runs every 60 seconds and grabs any automobiles from Inventory and using the AutomobileVO model.   
        - Vin - unique
        - Sold

- Special Features:

    + VIP : 
        - If the VIN number of a scheduled appointment matches the VIN of an AutomobileVO the appointment is marked as a VIP.  This is shown in the appointment 




Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
