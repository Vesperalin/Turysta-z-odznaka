from tests import client
import json


# common case
# testing /evidence-confirmation/evidence POST endpoint for adding new evidences to confirm selected tour segments
# in this case, user post few segments with attachment and few segemnts with id number of veryfying guide
# this endpoint should return array of reported tour segments (with evidence data) and status code 200
def test_add_evidence_attachment_and_id_guide(client):
    final_segments = [
        {"id": 1, "attachment": "inny_dowod.png", "startDate": "2020-01-01", "endDate": "2020-01-01"},
        {"id": 2, "attachment": "dowod.png", "startDate": "2020-01-01", "endDate": "2020-01-02"},
        {"id": 3, "attachment": "dowod.png", "startDate": "2020-01-03", "endDate": "2020-01-03"},
        {"id": 4, "verifying": 123456, "startDate": "2020-01-04", "endDate": "2020-01-04"},
        {"id": 5, "verifying": 123456, "startDate": "2020-01-05", "endDate": "2020-01-05"}
    ]
    
    tour_segments_data = {
        "attachments":
        [
            {"value": "dowod.png", "mountainGroup": 3, "tourSegments":
             [
                 {"id": 2, "startDate": "2020-01-01", "endDate": "2020-01-02"},
                 {"id": 3, "startDate": "2020-01-03", "endDate": "2020-01-03"}
             ]},
            {"value": "inny_dowod.png", "mountainGroup": 3, "tourSegments":
             [
                 {"id": 1, "startDate": "2020-01-01", "endDate": "2020-01-01"}
             ]}
        ],
        "verifying": [
            {"idVerifying": 123456, "tourSegments":
             [
                 {"id": 4, "startDate": "2020-01-04", "endDate": "2020-01-04"},
                 {"id": 5, "startDate": "2020-01-05", "endDate": "2020-01-05"}
             ]}
        ]
    }

    response = client.post(
        "/evidence-confirmation/evidence",
        data=json.dumps(tour_segments_data),
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 200

    segments = json.loads(response.data.decode('utf-8'))
    for segment in segments:
        tour_segment = next(item for item in final_segments if item["id"] == segment["id"])
        assert tour_segment["startDate"] == segment["startDate"]
        assert tour_segment["endDate"] == segment["endDate"]
        if tour_segment.get("attachment") != None:
            assert tour_segment.get("attachment") == segment["evidence"].get("photo_attachment")
        else:
            assert tour_segment.get("verifying") == segment["evidence"]["verifying"]["guide"]["id_number"]


# common case
# testing /evidence-confirmation/evidence POST endpoint for adding new evidences to confirm selected tour segments
# in this case, user post only few segments with attachment, no segments with verifying 
# this endpoint should return array of reported tour segments (with evidence data) and status code 200
def test_add_evidence_only_attachment(client):
    final_segments = [
        {"id": 9, "attachment": "photo.png", "startDate": "2020-01-01", "endDate": "2020-01-02"},
        {"id": 10, "attachment": "photo.png", "startDate": "2020-01-03", "endDate": "2020-01-03"},
    ]
    
    tour_segments_data = {
        "attachments":
        [
            {"value": "photo.png", "mountainGroup": 1, "tourSegments":
             [
                 {"id": 9, "startDate": "2020-01-01", "endDate": "2020-01-02"},
                 {"id": 10, "startDate": "2020-01-03", "endDate": "2020-01-03"}
             ]}
        ],
        "verifying": []
    }

    response = client.post(
        "/evidence-confirmation/evidence",
        data=json.dumps(tour_segments_data),
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 200

    segments = json.loads(response.data.decode('utf-8'))
    for segment in segments:
        tour_segment = next(item for item in final_segments if item["id"] == segment["id"])
        assert tour_segment["startDate"] == segment["startDate"]
        assert tour_segment["endDate"] == segment["endDate"]
        assert tour_segment.get("attachment") == segment["evidence"].get("photo_attachment")
        