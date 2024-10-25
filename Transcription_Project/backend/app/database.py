from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, TIMESTAMP
# from datetime import datetime

# Строка подключения к базе данных PostgreSQL

# Базовый класс для моделей
Base = declarative_base()

def get_engine():
    DATABASE_URL = "postgresql://postgres:Plotar1404@postgres_db/Transcription"
    engine = create_engine(DATABASE_URL, echo=True)
    return engine

def get_session():
    init_db()
    return sessionmaker(autocommit=False, autoflush=False, bind=get_engine())

def get_db():
    SessionLocal = get_session()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=get_engine())

class DBFiles(Base):
    """
    Represents files stored in the database.
    """
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True, comment="Unique identifier for the file")
    title = Column(String(255), nullable=True, comment="Title or name of the file")
    duration = Column(Integer, nullable=True, comment="Duration of the audio file in seconds")
    created_at = Column(TIMESTAMP, server_default=func.now(), comment="Timestamp when the file was created")
    size = Column(Integer, nullable=True, comment="Size of the file in bytes")
    path = Column(String(512), nullable=True, comment="Path to the file in MinIO storage")
