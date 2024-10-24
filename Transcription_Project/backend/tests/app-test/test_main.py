import pytest
import io



# TODO
###############################################################################################################
#Не получается импортировать свой проект FastAPI в тесты
# from backend.app.main import app as create_app
###############################################################################################################




from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from minio import Minio
from fastapi.testclient import TestClient


# from backend.app.main import app as create_app
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Plotar1404@localhost:5432/Transcription_test"

# Создаем движок и сессию
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="module")
def db_session():
    """Фикстура для создания сессии базы данных"""
    db = SessionLocal()
    yield db
    db.close()

@pytest.fixture(scope="module")
def minio_client():
    """Фикстура для MinIO клиента"""
    minio_client = Minio(
        "minio:9000",
        access_key="Root123",
        secret_key="Root123312213n",
        secure=False
    )
    yield minio_client

@pytest.fixture(scope="module")
def client():
    """Фикстура для FastAPI тестового клиента"""
    app = create_app()
    with TestClient(app) as c:
        yield c

def test_db_connection(db_session):
    """Тест подключения к базе данных"""
    try:
        # Выполняем простой запрос, чтобы проверить соединение
        result = db_session.execute(text("SELECT 1"))  # Обернули запрос в text()
        assert result.scalar() == 1
    except OperationalError as e:
        pytest.fail(f"Database connection failed: {e}")

def test_upload_file_to_minio(client, minio_client):
    """Тест загрузки файла в MinIO"""
    # Создаем временный файл в памяти
    file_content = b"This is a test file."
    file_name = "test_file.txt"
    file_stream = io.BytesIO(file_content)

    # Загружаем файл через API
    response = client.post("/upload", files={"file": (file_name, file_stream, "text/plain")})

    # Проверяем, что файл успешно загружен
    assert response.status_code == 200
    assert response.json() == {"status": "File uploaded", "file_name": file_name}

    # Проверяем, что файл действительно загружен в MinIO
    bucket_name = "mybucket"
    found_objects = list(minio_client.list_objects(bucket_name, prefix=file_name, recursive=True))
    assert len(found_objects) == 1
    assert found_objects[0].object_name == file_name
