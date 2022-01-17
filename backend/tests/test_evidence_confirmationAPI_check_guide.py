from tests import client
import json


# common case
# testing /evidence-confirmation/guide/<int:id_guide> GET endpoint for checking if requested guide exist - guide with specified id exists
# this endpoint should return message and status code 200
def test_check_guide_exists(client):
  id_number_guide = 123456

  response = client.get(f"/evidence-confirmation/guide/{id_number_guide}")

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 200
  assert message == "OK"


# edge case
# testing /evidence-confirmation/guide/<int:id_guide> GET endpoint for checking if requested guide exist - guide with specified id do not exists
# this endpoint should return message and status code 200
def test_check_guide_that_not_exists(client):
  id_number_guide = 654321

  response = client.get(f"/evidence-confirmation/guide/{id_number_guide}")

  message = json.loads(response.data.decode('utf-8')).get("message")

  assert response.status_code == 404
  assert message == "Przewodnik o podanym numerze legitymacji nie istnieje"