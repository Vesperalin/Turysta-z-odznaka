from tests import client
import json


# common case
# testing /own-points/<int:id> PUT endpoint for point - correct new data
# this endpoint should return message and status code 200
def test_update_point_correct_new_data(client):
    update_point_id = 21
    new_data_point = {
        "name": "Kopa",
        "latitude": 64.2345,
        "longitude": 16.5765
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_data_point),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 200
    assert message == "Punkt został pomyślnie edytowany"


# common case
# testing /own-points/<int:id> PUT endpoint for point where new name is changed for the same in point which is not being used in segments
# this endpoint should return message and status code 200
def test_update_point_for_the_same_name(client):
    update_point_id = 9
    new_data_point = {
        "name": "Ujsołów",
        "latitude": 32.2395,
        "longitude": 84.2473
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_data_point),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 200
    assert message == "Punkt został pomyślnie edytowany"


# common case
# testing /own-points/<int:id> PUT endpoint for point where new coordinates are changed for the same in point which is not being used in segments
# this endpoint should return message and status code 200
def test_update_point_for_the_same_coordinates(client):
    update_point_id = 9
    new_data_point = {
        "name": "Ujsołówek",
        "latitude": 32.2395,
        "longitude": 84.2473
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_data_point),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 200
    assert message == "Punkt został pomyślnie edytowany"


# edge case
# testing /own-points/<int:id> PUT endpoint for point where new name is changed for the same in point which is being used in segments
# point being used will be caught first
# this endpoint should return message with error and status code 400
def test_update_used_point_for_the_same_name(client):
    update_point_id = 6
    new_point_data = {
        "name": "Bacówka PTTK na Rycerzowej",
        "latitude": 12.2395,
        "longitude": 74.2473
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == "Punkt jest już używany w odcinkach. Nie można go edytować"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new name is already taken by another point and latitude is invalid
# non unique name will be caught first
# this endpoint should return message with error and status code 400
def test_update_point_with_existing_name_and_incorrect_latitude(client):
    update_point_id = 3
    new_point_data = {
        "name": "Milówka",
        "latitude": "12.4.5",
        "longitude": 2.33
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == 'Punkt o takiej nazwie już istnieje. Wybierz inną nazwę'


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new name is already taken by another point and longitude is invalid
# non unique name will be caught first
# this endpoint should return message with error and status code 400
def test_update_point_with_existing_name_and_incorrect_longitude(client):
    update_point_id = 3
    new_point_data = {
        "name": "Milówka",
        "latitude": 2.3333,
        "longitude": "12.4.5"
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == 'Punkt o takiej nazwie już istnieje. Wybierz inną nazwę'


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new longitude is invalid
# this endpoint should return message with error and status code 400
def test_update_point_with_invalid_longitude(client):
    update_point_id = 3
    new_point_data = {
        "name": "Magury",
        "latitude": 3.3333,
        "longitude": "12.4.5"
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == "Niepoprawne dane. Długość geograficzna musi być liczbą rzeczywistą"


# edge case
# testing /labeled-points/<int:id> PUT endpoint for point where new latitude is invalid
# this endpoint should return message with error and status code 400
def test_update_point_with_invalid_latitude(client):
    update_point_id = 3
    new_point_data = {
        "name": "Magury",
        "latitude": "12.4.5",
        "longitude": 3.3333
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == "Niepoprawne dane. Szerokość geograficzna musi być liczbą rzeczywistą"


# edge case
# testing /own-points/<int:id> PUT endpoint for point where new name is already taken by another point
# this endpoint should return message with error and status code 400
def test_update_point_with_existing_name(client):
    update_point_id = 4
    new_point_data = {
        "name": "magury",
        "latitude": 21.3333,
        "longitude": 3.3333
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"


# edge case
# testing /own-points/<int:id> PUT endpoint for point where new coordinates are already taken by another point
# this endpoint should return message with error and status code 400
def test_update_point_with_existing_coordinates(client):
    update_point_id = 4
    new_point_data = {
        "name": "Gubałówka",
        "latitude": 94.4353,
        "longitude": 21.2342
    }

    response = client.put(
        f"/own-points/{update_point_id}",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == "Punkt z podanymi wspołrzędnymi geograficznymi już istnieje"


# edge case
# testing /own-points/<int:id> PUT endpoint for point that can't be updated because it is already being used
# this endpoint should return message with error and status code 400
def test_update_point_that_can_not_be_updated(client):
    update_point_id = 8
    new_point_data = {
        "name": "Nazwa",
        "latitude": 21.3333,
        "longitude": 3.3333
    }

    response = client.put(
        f"/labeled-points/{update_point_id}",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == "Punkt jest już używany w odcinkach. Nie można go edytować"


# edge case
# testing /own-points/<int:id> PUT endpoint for point that doesn't exist (no point with given id)
# this endpoint should return message with error and status code 400
def test_update_point_that_not_exists(client):
    update_point_id = 1234
    new_point_data = {
        "name": "Nazwa",
        "latitude": 21.3333,
        "longitude": 3.3333
    }

    response = client.put(
        "/own-points/300",
        data=json.dumps(new_point_data),
        headers={"Content-Type": "application/json"},
    )

    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == "Punkt o wybranej nazwie nie istnieje"
