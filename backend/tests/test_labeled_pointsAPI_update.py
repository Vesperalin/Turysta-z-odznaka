from tests import client
import json


# common case
# testing /labeled-points/<int:id> PUT endpoint for point - correct new data
# this endpoint should return message and status code 200
def test_update_point_corrent_new_data(client):
  new_point_data = {
    "name": "Szkalna góra",
    "height": 1234
  }

  response = client.put(
    "/labeled-points/54",  # point with id 54 is not used in segments yet
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 200
  assert message == "Punkt został pomyślnie edytowany"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new name is changed for the same in point which is not being used in segments
# this endpoint should return message and status code 200
def test_update_point_for_the_same_name(client):
  new_point_data = {
    "name": "Kozi Wierch",
    "height": None
  }

  response = client.put(
    "/labeled-points/1",
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 200
  assert message == "Punkt został pomyślnie edytowany"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new name is changed for the same in point which is being used in segments
# point being used will be caught first
# this endpoint should return message with error and status code 400
def test_update_used_point_for_the_same_name(client):
  new_point_data = {
    "name": "Wetlina",
    "height": None
  }

  response = client.put(
    "/labeled-points/8",
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt jest już używany w odcinkach. Nie można go edytować"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new name is already taken by another point and height is invalid
# non unique name will be caught first
# this endpoint should return message with error and status code 400
def test_update_point_with_existing_name_and_incorrect_height(client):
  new_point_data = {
    "name": "Siklawa",
    "height": -456
  }

  response = client.put(
    "/labeled-points/1",
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new height is invalid
# this endpoint should return message with error and status code 400
def test_update_point_with_invalid_height(client):
  new_point_data = {
    "name": "Korona Wietrzysta",
    "height": -145
  }

  response = client.put(
    "/labeled-points/1",
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Niepoprawna wartość wysokości"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new name is already taken by another point
# this endpoint should return message with error and status code 400
def test_update_point_with_existing_name(client):
  new_point_data = {
    "name": "wetlina",
    "height": None
  }

  response = client.put(
    "/labeled-points/1",
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point that can't be updated because it is already being used
# this endpoint should return message with error and status code 400
def test_update_point_that_can_not_be_updated(client):
  new_point_data = {
    "name": "nowa wetlina",
    "height": None
  }

  response = client.put(
    "/labeled-points/8",  # 8 is an id of point used in segments
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt jest już używany w odcinkach. Nie można go edytować"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point that doesn't exist (no point with given id)
# this endpoint should return message with error and status code 400
def test_update_point_that_not_exists(client):
  new_point_data = {
    "name": "Nowa nazwa",
    "height": 523
  }

  response = client.put(
    "/labeled-points/300",
    data = json.dumps(new_point_data),
    headers = {"Content-Type": "application/json"},
  )

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 400
  assert message == "Punkt o wybranej nazwie nie istnieje"
