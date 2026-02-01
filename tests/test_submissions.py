import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from datastory.main import app
from datastory.db import get_session


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


def test_create_submission(client: TestClient):
    response = client.post(
        "/api/v1/submissions",
        json={"title": "Test Story", "description": "A test story content"},
    )
    data = response.json()

    assert response.status_code == 200
    assert data["content"] == {
        "title": "Test Story",
        "description": "A test story content",
    }
    assert "id" in data
    assert "created_at" in data


def test_create_submission_list(client: TestClient):
    submission_list = [
        {"userName": "asdf", "userStories": [{"id": 1, "action": "test"}]}
    ]
    response = client.post(
        "/api/v1/submissions",
        json=submission_list,
    )
    data = response.json()

    assert response.status_code == 200
    assert data["content"] == submission_list
    assert "id" in data


def test_get_submissions(client: TestClient):
    # First, create a submission
    client.post("/api/v1/submissions", json={"test": "data"})

    # Then, list all submissions
    response = client.get("/api/v1/submissions")
    data = response.json()

    assert response.status_code == 200
    assert isinstance(data, list)
    assert len(data) >= 1
    assert data[0]["content"] == {"test": "data"}
