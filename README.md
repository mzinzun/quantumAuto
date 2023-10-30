# CarCar

Team:

* Michael Z- Sales
* John Z - Services

## Design
![alt text](/img/projectDiagram.png "Project overview")

## To Run:
After cloning the repo run the following commands:
- cd into directory of repo and open docker desktop
- docker volume create beta-data
- docker-compose build
- docker-compose up
- use UI at http://localhost:3000/
    - create a Manufacturer, Model, and Automobile (in that order), in the Inventory dropdown.
    - create a Technician and Appointment (in that order) in the Services drop down
    - create a Salesperson, Customer and Sale (in that order) in the Sales drop down


## Inventory Microservice - Port 8100:8000

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

- Models - fields are self explanatory unless noted otherwise
    + Technician Model:
        - First Name
        - Last Name
        - Employee Id

    + Appointment Model:
        - Date Time
        - Reason - Reason for Appointment
        - Status - "created" is default, can toggle "finished" or "cancelled" on button click.
        - Vin - Customers vin and not necessarily unique
        - Customer
        - VIP - Appointment Model Vin matches AutomobileVO Vin customer is VIP - which manifests as a border around Appointment    ticket in Appointment List.
        - Technician - is a foreign Key and has a related name of appointment

    + AutomobileVO Model : Value Object of the the entity Automobile.  This is populated from the Inventory API via a Poller.  Poller runs every 60 seconds and grabs any automobiles from Inventory and using the AutomobileVO model.
        - Vin
        - Sold

- Special Features:

    + VIP :

        - If the VIN number of a scheduled appointment matches the VIN of an AutomobileVO the appointment is marked as a VIP.  This is shown in the appointment list as a field as well as a gold border around the appointment ticket.

    + Appointment Status :

        - Each appointment in the list of appointments has a button that allows a service concierge to "cancel" the appointment, or to mark the appointment as "finished". When a service appointment is canceled or finished, it no longer shows up in the list of appointments.  All Appointments will appear on the Service history page while Appointments only with the status "created" will appear on the Appointment List


## Sales microservice
![alt text](/img/sales2Diagram.png "Project overview")

### The Sales microservices represents the Sales Domain of The Project-Beta Monolith.  It isolates data related to customers, sales people, and sales.  The Data entities consists of Customers, SalesPeople, and Sales.  There is also a Value Object linked the the Automobile Entity in the Inventory domain.

##  Models and Enpoints:
### Customers
        fields:
            first_name
            last_name
            address
            city_state
            zip
            phone_number
        related endpoints
            http://localhost:8090/api/customers/
                Get: List customers
                POST: when submitting the create Customer form
            http://localhost:8090/api/customers/:id/
                DELETE: Delete customer
### SalesPerson
        fields:
            first_name
            last_name
            employee_id
        endpoints:
            http://localhost:8090/api/salespeople/
                Get: List Sales people
                POST: when submitting the create Salesperson form
            http://localhost:8090/api/salespeople/:id/
                DELETE: Delete Sales person
### Sales
        fields:
            automobile = models.ForeignKey(AutomobileVO)
            salesperson = models.ForeignKey(Salesperson)
            customer = models.ForeignKey(Customer)
            price
        endpoints:
            http://localhost:8090/api/sales/
                Get: List Sales
                POST: when submitting the create sale form
            http://localhost:8090/api/sales/:id/
                DELETE: Delete a sale Sale
### AutomobileVO
        fields:
            vin
            sold
        endpoints:
            http://localhost:8090/api/autosVO/
                GET: list Automobiles polled from Inventory.models.Automobile
## Special Features
        Search for Sales by Salesperson:
            allows user to list sales based on Salesperson on sale
