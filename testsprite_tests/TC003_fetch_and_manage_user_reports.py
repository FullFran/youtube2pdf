import os

import requests

BASE_URL = "http://localhost:3000"
EMAIL = os.getenv("TEST_EMAIL")
PASSWORD = os.getenv("TEST_PASSWORD")
VIDEO_ID = "2wY9bJOW9n8"
TIMEOUT = 30


def test_fetch_and_manage_user_reports():
    session = requests.Session()
    report_id = None
    try:
        # Login
        login_resp = session.post(
            f"{BASE_URL}/api/test/login",
            json={"email": EMAIL, "password": PASSWORD},
            timeout=TIMEOUT,
        )
        assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
        login_data = login_resp.json()
        assert "session" in login_data, "No session in login response"

        # Generate a new report for the given YouTube URL
        youtube_url = f"https://www.youtube.com/watch?v={VIDEO_ID}"
        gen_report_resp = session.post(
            f"{BASE_URL}/api/test/generate-report",
            json={"youtubeUrl": youtube_url},
            timeout=TIMEOUT,
        )
        assert gen_report_resp.status_code == 200, (
            f"Generate report failed: {gen_report_resp.text}"
        )
        gen_report_data = gen_report_resp.json()
        assert "reportId" in gen_report_data and gen_report_data["reportId"], (
            "No reportId returned"
        )
        report_id = gen_report_data["reportId"]

        # Fetch user reports
        get_reports_resp = session.get(
            f"{BASE_URL}/api/user-reports",
            timeout=TIMEOUT,
        )
        assert get_reports_resp.status_code == 200, (
            f"Fetching user reports failed: {get_reports_resp.text}"
        )
        reports = get_reports_resp.json()
        assert isinstance(reports, list), (
            f"Expected list of reports, got {type(reports)}"
        )
        # Check that the newly created report is in the list
        found_report = False
        for r in reports:
            if r.get("id") == report_id:
                found_report = True
                break
        assert found_report, "Created report not found in user reports"

        # Update the created report title to test management
        update_payload = {"title": "Updated Test Report Title"}
        update_resp = session.put(
            f"{BASE_URL}/api/user-reports/{report_id}",
            json=update_payload,
            timeout=TIMEOUT,
        )
        assert update_resp.status_code == 200, (
            f"Update report failed: {update_resp.text}"
        )
        updated_report = update_resp.json()
        assert updated_report.get("title") == update_payload["title"], (
            "Report title was not updated"
        )

    finally:
        # Cleanup: delete the created report
        if report_id:
            del_resp = session.delete(
                f"{BASE_URL}/api/user-reports/{report_id}",
                timeout=TIMEOUT,
            )
            # Accept 200 or 204 or 404 (if already deleted) as valid cleanup
            assert del_resp.status_code in {200, 204, 404}, (
                f"Failed to delete report: {del_resp.text}"
            )


test_fetch_and_manage_user_reports()
