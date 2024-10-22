from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, TIMESTAMP
# from datetime import datetime

# Строка подключения к базе данных PostgreSQL
DATABASE_URL = "postgresql://postgres:Plotar1404@postgres_db/Transcription"

# Создаем синхронный движок
engine = create_engine(DATABASE_URL, echo=True)

# Создаем сессию для работы с базой данных
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()

# Функция для получения сессии базы данных
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Функция инициализации базы данных
def init_db():
    Base.metadata.create_all(bind=engine)

class DBFiles(Base):
    _tablename_ = "files"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=True)
    duration = Column(Integer, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    size = Column(Integer, nullable=True)
    path = Column(String(512), nullable=True)  # Путь к файлу в MinIO

# Создаем таблицы в базе данных
Base.metadata.create_all(bind=engine)
