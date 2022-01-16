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

def test_get_specified_id_of_not_existing_point():
    pass

def test_get_speicfied_id_of_not_user_point():
    pass