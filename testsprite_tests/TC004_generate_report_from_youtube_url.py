import os

import requests


def test_generate_report_from_youtube_url():
    base_url = "http://localhost:3000"
    email = os.getenv("TEST_EMAIL")
    password = os.getenv("TEST_PASSWORD")
    video_id = "2wY9bJOW9n8"
    timeout = 30

    with requests.Session() as session:
        # Login
        login_url = f"{base_url}/api/test/login"
        login_payload = {"email": email, "password": password}
        try:
            login_resp = session.post(login_url, json=login_payload, timeout=timeout)
            login_resp.raise_for_status()
            login_json = login_resp.json()
            assert "session" in login_json, "Login failed: 'session' not in response"
        except requests.RequestException as e:
            assert False, f"Login request failed: {e}"

        # Generate report from YouTube URL
        generate_report_url = f"{base_url}/api/test/generate-report"
        generate_payload = {"videoId": video_id}
        try:
            generate_resp = session.post(
                generate_report_url, json=generate_payload, timeout=timeout
            )
            generate_resp.raise_for_status()
            generate_json = generate_resp.json()
        except requests.RequestException as e:
            assert False, f"Report generation request failed: {e}"

        # Validate response contains non-empty pdfBase64 string
        assert "pdfBase64" in generate_json, "Response missing 'pdfBase64'"
        pdf_base64 = generate_json["pdfBase64"]
        assert isinstance(pdf_base64, str) and pdf_base64.strip() != "", (
            "'pdfBase64' is empty or not a string"
        )

        # Optionally verify the string is base64-like (simple check)
        try:
            import base64

            base64.b64decode(pdf_base64, validate=True)
        except (base64.binascii.Error, ImportError) as e:
            assert False, f"'pdfBase64' is not valid Base64 encoded data: {e}"


test_generate_report_from_youtube_url()
