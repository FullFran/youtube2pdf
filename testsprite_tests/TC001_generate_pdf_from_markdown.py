import base64
import os

import requests

BASE_URL = "http://localhost:3000"
EMAIL = os.getenv("TEST_EMAIL")
PASSWORD = os.getenv("TEST_PASSWORD")


def test_generate_pdf_from_markdown():
    session = requests.Session()
    try:
        # Login
        login_resp = session.post(
            f"{BASE_URL}/api/test/login",
            json={"email": EMAIL, "password": PASSWORD},
            timeout=30,
        )
        assert login_resp.status_code == 200, (
            f"Login failed with status {login_resp.status_code}"
        )
        login_data = login_resp.json()
        assert "session" in login_data and login_data["session"], (
            "Session object missing in login response"
        )

        # Prepare markdown payload
        markdown_content = (
            "# Test PDF Generation\n"
            "This is a sample markdown to verify PDF generation.\n\n"
            "- Bullet 1\n"
            "- Bullet 2\n"
            "\n**Bold Text** and *italic text*."
        )
        payload = {"markdown": markdown_content}

        # Call generate-pdf endpoint (corrected endpoint)
        pdf_resp = session.post(
            f"{BASE_URL}/api/generate-pdf", json=payload, timeout=30
        )
        assert pdf_resp.status_code == 200, (
            f"Generate PDF request failed with status {pdf_resp.status_code}"
        )
        pdf_data = pdf_resp.json()

        # Validate pdfBase64 field
        assert "pdfBase64" in pdf_data, "pdfBase64 field missing in response"
        pdf_base64 = pdf_data["pdfBase64"]
        assert isinstance(pdf_base64, str) and pdf_base64.strip() != "", (
            "pdfBase64 is empty or not a string"
        )

        # Decode base64 to ensure it's valid base64
        try:
            pdf_bytes = base64.b64decode(pdf_base64, validate=True)
            assert len(pdf_bytes) > 0, "Decoded PDF bytes length is zero"
        except Exception as e:
            assert False, f"pdfBase64 is not valid base64: {e}"

    finally:
        session.close()


test_generate_pdf_from_markdown()
