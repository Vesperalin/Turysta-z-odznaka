from tests import client
import json


# common case
# testing /own-points/<int:id> GET endpoint for point with specified id
# this endpoint should return requested own point data and status code 200
def test_get_specified_id(client):
    own_point_id = 9

    response = client.get(f"/own-points/{own_point_id}")
    own_point = json.loads(response.data.decode('utf-8'))
    own_point_returned_id = own_point['id']

    assert response.status_code == 200
    assert own_point_returned_id == own_point_id


# edge case
# testing /own-points/<int:id> GET endpoint for not existing point with specified id
# this endpoint should return message with error and status code 400
def test_get_specified_id_of_not_existing_point(client):
    own_point_id = 1234

    response = client.get(f"/own-points/{own_point_id}")
    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == 'Punkt o wybranej nazwie nie istnieje'


# edge case
# testing /own-points/<int:id> GET endpoint for point with specified id
# requested point do not belongs to logged in user
# this endpoint should return message with error and status code 400
def test_get_speicfied_id_of_not_user_point(client):
    own_point_id = 19

    response = client.get(f"/own-points/{own_point_id}")
    message = json.loads(response.data.decode('utf-8')).get("message")

    assert response.status_code == 400
    assert message == 'Punkt nie należy do tego użytkownika'