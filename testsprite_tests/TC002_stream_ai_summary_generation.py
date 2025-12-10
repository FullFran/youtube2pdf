import os

import requests


def test_stream_ai_summary_generation():
    base_url = "http://localhost:3000"
    email = os.getenv("TEST_EMAIL")
    password = os.getenv("TEST_PASSWORD")
    videoId = "2wY9bJOW9n8"
    timeout = 30

    with requests.Session() as session:
        # Login
        login_url = f"{base_url}/api/test/login"
        login_payload = {"email": email, "password": password}
        login_resp = session.post(login_url, json=login_payload, timeout=timeout)
        assert login_resp.status_code == 200, "Login failed"
        login_json = login_resp.json()
        assert "session" in login_json, "No session object returned on login"

        # Stream AI summary generation
        stream_url = f"{base_url}/api/generate-stream"
        stream_payload = {"videoId": videoId}
        with session.post(
            stream_url, json=stream_payload, timeout=timeout, stream=True
        ) as resp:
            assert resp.status_code == 200, (
                f"Streaming request failed with status {resp.status_code}"
            )
            assert resp.headers.get("Content-Type", "").startswith(
                "text/event-stream"
            ) or "text/event-stream" in resp.headers.get("Content-Type", ""), (
                "Response is not a stream"
            )

            # Read stream progressively, accumulate content and check no errors or connection drops
            streamed_chunks = []
            try:
                for chunk in resp.iter_content(chunk_size=None):
                    if chunk:
                        streamed_chunks.append(chunk)
                # Ensure something was streamed
                content = b"".join(streamed_chunks).decode("utf-8", errors="ignore")
                assert content.strip(), "Streamed content is empty"
            except requests.RequestException as e:
                assert False, f"Error during streaming: {e}"


test_stream_ai_summary_generation()
