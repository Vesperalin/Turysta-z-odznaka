from tests import client
import json
from datetime import datetime


# common case
# testing /tour-creation/tour POST endpoint for creating tour with points that were never closed
# this endpoint should return created labeled segments and status code 200
def test_create_tour_with_never_closed_segments(client):
  new_tour_data = {
    "name": "Bieszczadzka przygoda",
    "points": 8,
    "segments": 
      [
        {
          "closed_segments": [],
          "color": "niebieski",
          "end_point_id": 43,
          "id": 10,
          "is_bidirectional": True,
          "liquidated_segment": None,
          "mountain_group_id": 1,
          "points": 7,
          "start_point_id": 12,
          "through": None
        },
        {
          "closed_segments": [],
          "color": "niebieski",
          "end_point_id": 44,
          "id": 13,
          "is_bidirectional": True,
          "liquidated_segment": None,
          "mountain_group_id": 1,
          "points": 1,
          "start_point_id": 43,
          "through": None
        }
      ]
  }

  # confirm that tour name unique
  response_for_check_name = client.post(
    "/tour-creation/check-name",
    data = json.dumps({"name": new_tour_data["name"]}),
    headers = {"Content-Type": "application/json"},
  )

  if_name_unique = json.loads(response_for_check_name.data.decode('utf-8'))


  response_for_tour_creation = client.post(
    "/tour-creation/tour",
    data = json.dumps(new_tour_data),
    headers = {"Content-Type": "application/json"},
  )

  tour_segments = json.loads(response_for_tour_creation.data.decode('utf-8'))


  # confirm GOT points were calculated correctly
  GOT_points = 0

  for segment in tour_segments:
    GOT_points += segment["points"]


  # confirm segments contiguous and not closed / liquidated in points
  if_contiguous_not_closed_not_liquidated = True

  for i in range(0, len(tour_segments) - 1):
    # check if contiguous
    if (tour_segments[i]["labeled_segment"]["end_point"]["id"] != tour_segments[i + 1]["labeled_segment"]["start_point"]["id"]):
      if_contiguous_not_closed_not_liquidated = False
    
    # check if not liquidated
    if (tour_segments[i]["labeled_segment"]["liquidated_segment"] != None):
      if_contiguous_not_closed_not_liquidated = False

    # check if currently not closed
    if (tour_segments[i]["labeled_segment"]["closed_segments"] != None):
      for closedSegment in tour_segments[i]["labeled_segment"]["closed_segments"]:
        todays_date = datetime.today().date()
        closure_date = datetime.strptime(closedSegment["closureDate"], '%Y-%m-%d').date()

        if (closedSegment["openingDate"] == None):
          if (todays_date >= closure_date):
              if_contiguous_not_closed_not_liquidated = False
        else:
          opening_date = datetime.strptime(closedSegment["openingDate"], '%Y-%m-%d').date()

          if (todays_date >= closure_date and todays_date <= opening_date):
            if_contiguous_not_closed_not_liquidated = False


  assert response_for_check_name.status_code == 200
  assert if_name_unique == True

  assert response_for_tour_creation.status_code == 200
  assert GOT_points == new_tour_data["points"]
  assert if_contiguous_not_closed_not_liquidated == True


# common case
# testing /tour-creation/tour POST endpoint for creating tour with points that were once closed in the past
# this endpoint should return created labeled segments and status code 200
def test_create_tour_with_closed_segments_in_past(client):
  new_tour_data = {
    "name": "Bieszczady z rodziną 2022",
    "points": 21,
    "segments": 
      [
        {
          "closed_segments": [], 
          "color": "niebieski", 
          "end_point_id": 43, 
          "id": 6, 
          "is_bidirectional": True, 
          "liquidated_segment": None, 
          "mountain_group_id": 1, 
          "points": 12, 
          "start_point_id": 42, 
          "through": None
        },
        {
          "closed_segments": [
            {
              "closureDate": "2020-11-07", 
              "id": 8, 
              "openingDate": "2021-03-03"
            }
          ], 
          "color": "niebieski", 
          "end_point_id": 12, 
          "id": 11, 
          "is_bidirectional": True, 
          "liquidated_segment": None, 
          "mountain_group_id": 1, 
          "points": 6, 
          "start_point_id": 43, 
          "through": None
        }, 
        {
          "closed_segments": [], 
          "color": "brak", 
          "end_point_id": 47, 
          "id": 20, 
          "is_bidirectional": True, 
          "liquidated_segment": None, 
          "mountain_group_id": 1, 
          "points": 3, 
          "start_point_id": 12, 
          "through": None
        }
      ]
  }


  # confirm that tour name unique
  response_for_check_name = client.post(
    "/tour-creation/check-name",
    data = json.dumps({"name": new_tour_data["name"]}),
    headers = {"Content-Type": "application/json"},
  )

  if_name_unique = json.loads(response_for_check_name.data.decode('utf-8'))


  response_for_tour_creation = client.post(
    "/tour-creation/tour",
    data = json.dumps(new_tour_data),
    headers = {"Content-Type": "application/json"},
  )

  tour_segments = json.loads(response_for_tour_creation.data.decode('utf-8'))


  # confirm GOT points were calculated correctly
  GOT_points = 0

  for segment in tour_segments:
    GOT_points += segment["points"]


  # confirm segments contiguous and not closed / liquidated in points
  if_contiguous_not_closed_not_liquidated = True

  for i in range(0, len(tour_segments) - 1):
    # check if contiguous
    if (tour_segments[i]["labeled_segment"]["end_point"]["id"] != tour_segments[i + 1]["labeled_segment"]["start_point"]["id"]):
      if_contiguous_not_closed_not_liquidated = False
    
    # check if not liquidated
    if (tour_segments[i]["labeled_segment"]["liquidated_segment"] != None):
      if_contiguous_not_closed_not_liquidated = False

    # check if currently not closed
    if (tour_segments[i]["labeled_segment"]["closed_segments"] != None):
      for closedSegment in tour_segments[i]["labeled_segment"]["closed_segments"]:
        todays_date = datetime.today().date()
        closure_date = datetime.strptime(closedSegment["closureDate"], '%Y-%m-%d').date()

        if (closedSegment["openingDate"] == None):
          if (todays_date >= closure_date):
              if_contiguous_not_closed_not_liquidated = False
        else:
          opening_date = datetime.strptime(closedSegment["openingDate"], '%Y-%m-%d').date()

          if (todays_date >= closure_date and todays_date <= opening_date):
            if_contiguous_not_closed_not_liquidated = False


  assert response_for_check_name.status_code == 200
  assert if_name_unique == True

  assert response_for_tour_creation.status_code == 200
  assert GOT_points == new_tour_data["points"]
  assert if_contiguous_not_closed_not_liquidated == True
