from tests import client
import json


# common case
# testing /labeled-points/like/<string:like> endpoint for phrase that matches to one point
# this endpoint should return list of matching points and status code 200
def test_like_with_matched_to_one_point_string(client):
  ids_of_all_labeled_points = [12]
  unmatched_phrase = "kor"

  response = client.get("labeled-points/like/" + unmatched_phrase)
  labeled_points = json.loads(response.data.decode('utf-8'))
  labeled_points_ids = list(map(lambda point: point['id'], labeled_points))

  assert response.status_code == 200
  assert ids_of_all_labeled_points == labeled_points_ids


# common case
# testing /labeled-points/like/<string:like> endpoint for phrase that matches to few points
# this endpoint should return list of matching points and status code 200
def test_like_with_matched_to_few_points_string(client):
  ids_of_all_labeled_points = [11, 14]
  unmatched_phrase = "poł"

  response = client.get("labeled-points/like/" + unmatched_phrase)
  labeled_points = json.loads(response.data.decode('utf-8'))
  labeled_points_ids = list(map(lambda point: point['id'], labeled_points))

  assert response.status_code == 200
  assert ids_of_all_labeled_points == labeled_points_ids


# common case
# testing /labeled-points/like/<string:like> endpoint for phrase that matches to many points
# this endpoint should return list of matching points and status code 200
def test_like_with_matched_to_many_points_string(client):
  ids_of_all_labeled_points = [1, 4, 12, 13, 22, 46, 48, ]
  unmatched_phrase = "ko"

  response = client.get("labeled-points/like/" + unmatched_phrase)
  labeled_points = json.loads(response.data.decode('utf-8'))
  labeled_points_ids = list(map(lambda point: point['id'], labeled_points))

  assert response.status_code == 200
  assert ids_of_all_labeled_points == labeled_points_ids


# edge case
# testing /labeled-points/like/<string:like> endpoint for empty string
# this endpoint should return all labeled points and status code 200
def test_like_with_empty_string(client):
  ids_of_all_labeled_points = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,42,43,44,45,46,47,48,49,50,51,52,53,54]
  
  response = client.get("labeled-points/like/")
  labeled_points = json.loads(response.data.decode('utf-8'))
  labeled_points_ids = list(map(lambda point: point['id'], labeled_points))

  assert response.status_code == 200
  assert ids_of_all_labeled_points == labeled_points_ids


# edge case
# testing /labeled-points/like/<string:like> endpoint for phrase that no labeled point contains
# this endpoint should return empty list of points and status code 200
def test_like_with_unmatched_to_any_points_string(client):
  ids_of_all_labeled_points = []
  unmatched_phrase = "abcdefg"

  response = client.get("labeled-points/like/" + unmatched_phrase)
  labeled_points = json.loads(response.data.decode('utf-8'))
  labeled_points_ids = list(map(lambda point: point['id'], labeled_points))

  assert response.status_code == 200
  assert ids_of_all_labeled_points == labeled_points_ids
