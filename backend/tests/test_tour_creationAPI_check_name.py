from tests import client
import json


# common case
# testing /tour-creation/check-name POST endpoint for tour name - tourist doesn't have tour with the name
# this endpoint should return message and status code 200
def test_check_name_that_not_exists(client):
  tour_name = {
    "name": "Bieszczadzka przygoda"
  }

  response = client.post(
    "/tour-creation/check-name",
    data = json.dumps(tour_name),
    headers = {"Content-Type": "application/json"},
  )

  if_name_unique = json.loads(response.data.decode('utf-8'))

  assert response.status_code == 200
  assert if_name_unique == True


# edge case
# testing /tour-creation/check-name POST endpoint for tour name - tourist already has tour with the name
# this endpoint should return message and status code 400
def test_check_name_that_exists(client):
  tour_name = {
    "name": "Bieszczady 2022"
  }

  response = client.post(
    "/tour-creation/check-name",
    data = json.dumps(tour_name),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Trasa o wybranej nazwie już istnieje. Wybierz inną nazwę"
