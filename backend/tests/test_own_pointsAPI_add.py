from tests import client
import json


# common case
# testing /own-points POST endpoint for new point with correct values
# this endpoint should return message and status code 200
def test_add_point_with_correct_values(client):
  new_point_data = {
        "name": "Smerek",
        "latitude": 18.1373,
        "longitude": 23.7853
    }

  response = client.post(
    "/own-points",
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 200
  assert message == "Punkt został pomyślnie dodany"


# edge case
# testing /own-points POST endpoint for new point with non unique name
# this endpoint should return message with error and status code 400
def test_add_point_with_incorrect_name(client):
  new_point_data = {
    "name": "smeRek", 
    "latitude": 18.1473,
    "longitude": 23.7853
  }

  response = client.post(
    "/own-points",
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"


# edge case
# testing /own-points POST endpoint for new point with incorrect latitude
# this endpoint should return message with error and status code 400
def test_add_point_with_incorrect_latitude(client):
  new_point = {
    "name": "Pieskowa Skałą", 
    "latitude": "23.",
    "longitude": 23.7853
  }

  response = client.post(
    "/own-points",
    data = json.dumps(new_point),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Niepoprawne dane. Szerokość geograficzna musi być liczbą rzeczywistą"


# edge case
# testing /own-points POST endpoint for new point with incorrect longitude
# this endpoint should return message with error and status code 400
def test_add_point_with_incorrect_longitude(client):
  new_point = {
    "name": "Pieskowa Skałą", 
    "latitude": 23.7854,
    "longitude": "23."
  }

  response = client.post(
    "/own-points",
    data = json.dumps(new_point),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Niepoprawne dane. Długość geograficzna musi być liczbą rzeczywistą"


# edge case
# testing /own-points POST endpoint for new point with non unique coordinates
# this endpoint should return message with error and status code 400
def test_add_point_with_non_unique_coordinates(client):
  new_point = {
    "name": "Pieskowa Skałą", 
    "latitude": 18.1373,
    "longitude": 23.7853
  }

  response = client.post(
    "/own-points",
    data = json.dumps(new_point),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt z podanymi wspołrzędnymi geograficznymi już istnieje"
