from tests import client
from API.labeled_pointsAPI import get_points


def test_test(client):
  landing = client.get("/labeled-points")
  print(landing)
  assert 1 == 1
