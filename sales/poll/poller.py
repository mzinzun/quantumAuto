import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import AutomobileVO


def poll(repeat=True):
    def get_autos():
        response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles")
        data = json.loads(response.content)
        print('data from poller: ', data)
        for auto in data['automobiles']:
            AutomobileVO.objects.update_or_create(
                vin=auto["vin"],
                sold=auto["sold"]
            )
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            get_autos()
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
