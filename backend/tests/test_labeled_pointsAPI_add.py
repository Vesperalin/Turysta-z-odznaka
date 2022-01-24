from tests import client
import json


# common case
# testing /labeled-points POST endpoint for new point with height
# this endpoint should return message and status code 200
def test_add_point_with_correct_name_and_given_height(client):
  new_point = {
    "name": "Punkt testowy 1",
    "height": 1245
  }

  response = client.post(
    "/labeled-points",
    data = json.dumps(new_point),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 200
  assert message == "Punkt został pomyślnie dodany"


# common case
# testing /labeled-points POST endpoint for new point with no height
# this endpoint should return message and status code 200
def test_add_point_with_correct_name_and_no_height(client):
  new_point = {
    "name": "Punkt testowy 2",
    "height": None
  }

  response = client.post(
    "/labeled-points",
    data = json.dumps(new_point),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 200
  assert message == "Punkt został pomyślnie dodany"


# edge case
# testing /labeled-points POST endpoint for new point with non unique name and invalid height
# non unique name will be caught first
# this endpoint should return message with error and status code 400
def test_add_point_with_incorrect_name_and_incorrect_height(client):
  new_point = {
    "name": "weTliNa",  # point with this name exist in DB. Also shows that it is not case sensitive
    "height": -456
  }

  response = client.post(
    "/labeled-points",
    data = json.dumps(new_point),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"


# edge case
# testing /labeled-points POST endpoint for new point with non unique name
# this endpoint should return message with error and status code 400
def test_add_point_with_incorrect_name(client):
  new_point = {
    "name": "weTliNa",  # point with this name exist in DB. Also shows that it is not case sensitive
    "height": None
  }

  response = client.post(
    "/labeled-points",
    data = json.dumps(new_point),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"


# edge case
# testing /labeled-points POST endpoint for new point with incorrect height (< 0)
# this endpoint should return message with error and status code 400
def test_add_point_with_incorrect_height(client):
  new_point = {
    "name": "Punkt testowy 3",
    "height": -23
  }

  response = client.post(
    "/labeled-points",
    data = json.dumps(new_point),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Niepoprawna wartość wysokości"
