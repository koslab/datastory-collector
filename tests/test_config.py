import pytest
import os
import json
from fastapi.testclient import TestClient
from datastory.main import app
from datastory.config import settings

@pytest.fixture(name="client")
def client_fixture():
    with TestClient(app) as client:
        yield client

def test_get_config_success(client: TestClient, tmp_path):
    # Setup a temporary config file
    config_data = {"test_key": "test_value"}
    config_file = tmp_path / "test_config.json"
    config_file.write_text(json.dumps(config_data))
    
    # Save original settings
    original_path = settings.config_json_path
    
    # Override settings
    settings.config_json_path = str(config_file)
    
    try:
        response = client.get("/api/v1/config")
        assert response.status_code == 200
        expected_data = config_data.copy()
        expected_data["api_base_url"] = settings.api_base_url
        assert response.json() == expected_data
    finally:
        # Restore settings
        settings.config_json_path = original_path

def test_get_config_fallback(client: TestClient):
    # Point to a non-existent file to test fallback logic
    original_path = settings.config_json_path
    settings.config_json_path = "non_existent_file.json"
    
    try:
        response = client.get("/api/v1/config")
        # Should return the default frontend config as fallback
        assert response.status_code == 200
        data = response.json()
        assert "actions" in data
        assert "metrics" in data
    finally:
        settings.config_json_path = original_path
